const express=require('express');
const app = express();
const bcrypt = require('bcrypt');
const profile=require('../../model/admin/profile')
const classfy=require('../../model/admin/classfy')
const user=require('../../model/admin/user')
const cart=require('../../model/admin/cart')
app.set('view engine', 'ejs');
module.exports={
    account:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        var users
        if(iduser>=0){
            carts= await cart.getcart(iduser)
            users=await user.getedit(iduser)
        }
       const classfys= await classfy.classfy()
       res.render('page/my-account',{carts:carts,users:users,classfys:classfys}) 
    },
    changeAccount: async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        var users
        if(iduser>=0){
            carts= await cart.getcart(iduser)
            users=await user.getedit(iduser)
        }
        const name=req.body.name
        const phone=req.body.phone
        const address1=req.body.address1
        const email=req.body.email
        const update=await user.changeAccount(iduser,name,phone,address1,email)
       res.redirect('/my-account')
    },
    address:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        var users
        if(iduser>=0){
            carts= await cart.getcart(iduser)
            users=await user.getedit(iduser)
        }
       const classfys= await classfy.classfy()
       const data= await user.useraddress(iduser)
    res.render('page/addresuser',{carts:carts,users:users,classfys:classfys,data:data})
    },
    postaddress:async(req,res)=>{
        const link=req.originalUrl
        const iduser=parseInt(req.session.userId)
        const name=req.body.name
        const phone=req.body.phone
        const address1=req.body.address1
        const crea= await user.createAddress(name,phone,address1,iduser)
        res.redirect(`${link}`)
    },
    saveaddress:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        const address=parseInt(req.body.select)
        const crea= await user.saveAddress(iduser,address)
        res.redirect('/my-account/address')
    },
    deleteaddress:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        const address=parseInt(req.params.ID)
        const crea= await user.deleteAddress(address)
        res.redirect('/my-account/address')
        }
}