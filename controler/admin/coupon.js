const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/coupon')
const classfys=require('../../model/admin/classfy')
const products=require('../../model/admin/product')
const users=require('../../model/admin/user')
function coupons(length) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    for (let i = 0; i < length - 5; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    result = result.split('').sort(() => Math.random() - 0.5).join('');
    return result;
}
module.exports={
    getCreate:async(req,res)=>{
        const data=await classfys.classfy()
        const product=await products.product()
        res.render('create/coupon',{tag:data,product:product})
    },
    postCreate:async(req,res)=>{
        const name=req.body.name;
        const discountpercent=req.body.discountpercent;
        const discountprice=req.body.discountprice;
        const quantity=req.body.quantity;
        const buymin=req.body.buymin;
        var classfy=req.body.classfys;
        var product=req.body.product;
        console.log(product)
        const clas=await classfys.classfyid()
        if(classfy == 'All'){
            classfy=[]
            for(var i=0;i< clas.length; i++){
               classfy.push(clas[i].id)
            }
        }
        const data=await model.coupon()
        var coupo=coupons(10);
        do{
            var check=0;
          for(var i=0; i< data.length;i++){
            if(data[i].coupon == coupo){
                check=1
                coupo=coupons(10)
            }
          }
        }while(check==1)
        const crea=await model.creatcoupon(name,discountpercent,quantity,discountprice,buymin,classfy,coupo)
        res.redirect('/admin/coupon')
    },
    getactive:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const upda=await model.getactive(id)
        res.redirect('/admin/coupon')
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/coupon')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        const clas=await classfys.classfy()
        res.render('./edit/coupon',{data:data,tag:clas})
    },
    // postedit:async(req,res)=>{
    //     const id=parseInt(req.params.ID);
    //     const color=req.body.color;
    //     const name=req.body.name
    //     const create= await model.postedit(id,color,name)
    //     res.redirect('/admin/color') 

    // },
    coupon:async(req,res)=>{
        const data= await model.coupon();
        res.render('pageadmin/coupon',{data:data})
    },
    getdonate:async(req,res)=>{
        const coupon= await model.coupon();
        const user= await users.user()
        res.render('create/donate',{user:user,coupon:coupon})
    },
    postdonate:async(req,res)=>{
        var user=req.body.user;
        const datauser=await users.user();
        const coupon=req.body.coupon
        if(user == 'All'){
        user=[]
            for(var i=0;i< datauser.length; i++){
                user.push(datauser[i].id)
            }
        }
        const crea=await model.donatecoupon(user,coupon)
        res.redirect('/admin/coupon')
    }
}

