const express=require('express');
const app = express();
const bcrypt = require('bcrypt');
const profile=require('../../model/admin/profile')
const classfy=require('../../model/admin/classfy')
const cart=require('../../model/admin/cart')
app.set('view engine', 'ejs');
module.exports={
    login:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }
        var check=1;
        const classfys=await classfy.classfy()
        res.render('page/login',{check,carts:carts,classfys:classfys})
    },
}