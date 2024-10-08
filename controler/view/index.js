const express=require('express');
const app = express();
const bcrypt = require('bcrypt');
const adminModel=require('../../model/admin/admin')
const product=require('../../model/admin/product')
const profile=require('../../model/admin/profile')
const classfy=require('../../model/admin/classfy')
const soicial=require('../../model/admin/soicial')
const userclass=require('../../model/admin/userclass')
const cart=require('../../model/admin/cart')
const marketingsale=require('../../model/admin/marketing-sale')
const marketingblog=require('../../model/admin/marketing-blog')
const marketings=require('../../model/admin/marketing')
app.set('view engine', 'ejs');
module.exports={
    index:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }
        const datamarketingsale=await marketingsale.marketing_sale()
        const blogs=await marketingblog.marketing_blog()
        const datamarketing=await marketings.marketing()
        const profiles=await profile.profile()
        const products= await product.product()
        const topsale=await product.topsale()
        const topview=await product.topview()
        const userclas=await userclass.userclass6()
        const classfys=await classfy.classfy()
        const topdiscount= await product.topdiscount()
        const social=await soicial.soicial()
        res.render('page/index',{carts:carts,marketingsale:datamarketingsale,blogs:blogs,
            marketing:datamarketing,profile:profiles,product:products,
            topsale:topsale,topview:topview,userclass:userclas,social:social,classfys:classfys});
    }
}