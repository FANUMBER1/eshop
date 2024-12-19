const express=require('express');
const app = express();
const bcrypt = require('bcrypt');
const product=require('../../model/admin/product')
const profile=require('../../model/admin/profile')
const classfy=require('../../model/admin/classfy')
const user=require('../../model/admin/user')
const oder=require('../../model/admin/oder')
const cart=require('../../model/admin/cart')
const coupon=require('../../model/admin/coupon')
app.set('view engine', 'ejs');
module.exports={
    oder:async(req,res)=>{
        const idaddress=parseInt(req.query.select)
        const iduser=parseInt(req.session.userId);
        const idoder=parseInt(req.params.ID);
        const crea= await oder.oder(iduser,idoder,idaddress);
        const increa=await product.incresale(idoder)
        res.redirect('/cart/oder-comfirm')
    },
    getoder:async(req,res)=>{
        const iduser=parseInt(req.session.userId);
        var carts
        var data
        if(iduser>=0){
            carts= await cart.getcart(iduser)
            data=await oder.useroder(iduser,4)
        }
        const classfys=await classfy.classfy()
        res.render('page/useroder',{carts:carts,data:data,classfys:classfys,k1:'',k2:'',k3:'',k4:'',k5:''})
    }
}