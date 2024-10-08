const express=require('express');
const app = express();
const bcrypt = require('bcrypt');
const contact=require('../../model/admin/contact')
const cart=require('../../model/admin/cart')
const classfy=require('../../model/admin/classfy')
app.set('view engine', 'ejs');
module.exports={
contact:async(req,res)=>{
    const iduser=parseInt(req.session.userId)
    var carts
    if(iduser>=0){
        carts= await cart.getcart(iduser)
    }       
    const classfys=await classfy.classfy()
     res.render('page/contact',{carts:carts,classfys:classfys})
   },
postcontact:async(req,res)=>{
    const name=req.body.name;
    const subject=req.body.subject;
    const email=req.body.email;
    const phone=req.body.phone;
    const message=req.body.message;
    const crea=await contact.create(name,subject,email,phone,message)
    res.redirect('/contact')
},
getcontact:async(req,res)=>{
    const id=parseInt(req.params.ID)
    const data= await contact.getcontact(id)
    res.render('edit/fullcontact',{data:data})
}
}