const express=require('express');
const app = express();
const bcrypt = require('bcrypt');
const adminModel=require('../../model/admin/admin')
const product=require('../../model/admin/product')
const profile=require('../../model/admin/profile')
const classfy=require('../../model/admin/classfy')
const cart=require('../../model/admin/cart')
const oder=require('../../model/admin/oder')
app.set('view engine', 'ejs');
module.exports={
    cart:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }     
        const classfys=await classfy.classfy()   
        var falsess
        res.render('page/cart',{carts:carts,classfys:classfys,errorMessage:falsess, k1:'',k2:'',k3:'active',k4:'',k5:''
        })
    },
    creat_cart:async(req,res)=>{
        const idproduct=parseInt(req.params.ID);
        const iduser=parseInt(req.session.userId)
        const quantity=req.body.quantity||'1';
        const color=req.body.color
        const size=req.body.size
        if(iduser>=0){
         const cre=await cart.creat_cart(idproduct,iduser,quantity)
         }
         const dis=await product.reduce(idproduct)
        res.redirect(`/product/${idproduct}`)     
     },
     remove:async(req,res)=>{
        const iduser=parseInt(req.session.userId);
        const idproduct=parseInt(req.params.ID);
        const del= await cart.remove(iduser,idproduct)
        res.redirect('/cart')
    },
    oderComfirm:async(req,res)=>{
        const iduser=parseInt(req.session.userId);
        var carts
        var data
        if(iduser>=0){
            carts= await cart.getcart(iduser)
            data=await oder.useroder(iduser,1)
        }
        const classfys=await classfy.classfy()
        res.render('page/oder/oder-comfirm',{carts:carts,data:data,classfys:classfys,k1:'',k2:'',k3:'',k4:'',k5:''})
    },
    oderDelivery:async(req,res)=>{
        const iduser=parseInt(req.session.userId);
        var carts
        var data
        if(iduser>=0){
            carts= await cart.getcart(iduser)
            data=await oder.useroder(iduser,2)
        }
        const classfys=await classfy.classfy()
        res.render('page/oder/oder-delivery',{carts:carts,data:data,classfys:classfys,k1:'',k2:'',k3:'',k4:'',k5:''})
    },
    oderTransit:async(req,res)=>{
        const iduser=parseInt(req.session.userId);
        var carts
        var data
        if(iduser>=0){
            carts= await cart.getcart(iduser)
            data=await oder.useroder(iduser,3)
        }
        const classfys=await classfy.classfy()
        res.render('page/oder/oder-transit',{carts:carts,data:data,classfys:classfys,k1:'',k2:'',k3:'',k4:'',k5:''})
    },
    oderCompleted:async(req,res)=>{
        const iduser=parseInt(req.session.userId);
        var carts
        var data
        if(iduser>=0){
            carts= await cart.getcart(iduser)
            data=await oder.useroder(iduser,4)
        }
        const classfys=await classfy.classfy()
        res.render('page/oder/oder-completed',{carts:carts,data:data,classfys:classfys,k1:'',k2:'',k3:'',k4:'',k5:''})
    }
}