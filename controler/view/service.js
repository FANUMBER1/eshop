const express=require('express');
const app = express();
const bcrypt = require('bcrypt');
const contact=require('../../model/admin/contact')
const cart=require('../../model/admin/cart')
const classfy=require('../../model/admin/classfy')
app.set('view engine', 'ejs');
module.exports={
service:async(req,res)=>{
    const iduser=parseInt(req.session.userId)
    var carts
    if(iduser>=0){
        carts= await cart.getcart(iduser)
    }       
    const classfys=await classfy.classfy()
     res.render('page/service',{carts:carts,classfys:classfys})
   },

}