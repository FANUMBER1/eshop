const express=require('express');
const app = express();
const bcrypt = require('bcrypt');
const adminModel=require('../../model/admin/admin')
const profile=require('../../model/admin/profile')
const classfy=require('../../model/admin/classfy')
const user=require('../../model/admin/user')
const cart=require('../../model/admin/cart')
app.set('view engine', 'ejs');
module.exports={
    register:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }
        var check=1;
        const classfys=await classfy.classfy()
        res.render('page/register',{check,carts:carts,classfys:classfys})
    },
    postregister:async(req,res)=>{
        const name= req.body.name;
        const email=req.body.email;
        const pass0=req.body.password;
        const pas = bcrypt.hashSync(pass0, 10);
        const firstname=req.body.firstname;
        const lastname=req.body.lastname;
        const phone=req.body.phone;
        const country=req.body.country;
        const state=req.body.state;
        const address1=req.body.address1;
        const address2=req.body.address2;
        const code=req.body.code;
        const company=req.body.company;
        const data=[]
        const anh=req.file;
        const img= adminModel.checkImg(anh,data)
        const role=2;
        const crea= user.create(name,email,pas,img,firstname,lastname,phone,country,state,
            address1,address2,code,company,role);
        res.redirect('/login')
    }
}