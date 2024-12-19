const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/coupon')
const classfys=require('../../model/admin/classfy')
const products=require('../../model/admin/product')
const users=require('../../model/admin/user')
const typers=require('../../model/admin/typeruser')
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
        const user= await users.user()
        const data=await classfys.classfy()
        const product=await products.product()
        const typer=await typers.typeruser()
        res.render('create/coupon',{tag:data,product:product,user:user,typer:typer})
    },
    postCreate:async(req,res)=>{
        const name=req.body.name;
        const discountvalue=req.body.valuediscount;
        const discountclass=req.body.discount
        const quantity=req.body.quantity;
        const buymin=req.body.buymin;
        var classfy=req.body.classfys;
        var product=req.body.product;
        var discountpercent=''
        var discountprice=''
        var usertest=req.body.user
        var typer=req.body.typer
        const user=[]
        const discountmin=req.body.discountmin
        const data=await model.coupon()
        const datauser=await users.user()
        const usermin=req.body.usermin
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
        if(discountclass==1){
          discountprice=discountvalue
        }else{
            discountpercent=discountvalue
        }

        if(usertest != undefined){
            for(var j=0; j< usertest.length ;j++){
                user.push(usertest[j])
            }
        }
        console.log(product)
        const coupon=await model.creatcoupon(name,discountpercent,quantity,discountprice,buymin,classfy,coupo,product,discountmin,usermin)
        const creatcoupon=await model.donatecoupon(user,coupon,typer)
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
        const produ=await products.product()
        const user=await users.user()
        var discount
        var check
        if(parseInt(data.discountpercent) > 0){
             discount=data.discountpercent
             check=2
        }else{
            discount=data.discountprice
            check=1
        }
        const typer=await typers.typeruser()
        res.render('./edit/coupon',{data:data,tag:clas,product:produ,check:check,discount:discount,user:user,typer:typer})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name=req.body.name;
        const discountvalue=req.body.valuediscount;
        const discountclass=req.body.discount
        const quantity=req.body.quantity;
        const buymin=req.body.buymin;
        var classfy=req.body.classfys;
        var product=req.body.product;
        var discountpercent=''
        var discountprice=''
        var usertest=req.body.user
        var typer=req.body.typer
        const user=[]
        const discountmin=req.body.discountmin
        const data=await model.coupon()
        const datauser=await users.user()
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
        if(discountclass==1){
          discountprice=discountvalue
        }else{
            discountpercent=discountvalue
        }

        if(usertest== 'All' ){
            for(var i=0 ; i< datauser.length; i++){
                 user.push(datauser[i].id)
            }
        }else if(usertest != undefined){
            for(var j=0; j< usertest.length ;j++){
                user.push(usertest[j])
            }
        }        
        console.log(product)
        const updat= await model.postedit(name,discountpercent,quantity,discountprice,buymin,classfy,coupo,product,discountmin,id,typer,user)
        res.redirect('/admin/coupon') 

    },
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

