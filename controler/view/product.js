const express=require('express');
const app = express();
const bcrypt = require('bcrypt');
const adminModel=require('../../model/admin/admin')
const product=require('../../model/admin/product')
const profile=require('../../model/admin/profile')
const blog=require('../../model/admin/blog')
const categoris=require('../../model/admin/categori')
const classfy=require('../../model/admin/classfy')
const color=require('../../model/admin/color')
const contact=require('../../model/admin/contact')
const discount=require('../../model/admin/discount')
const role=require('../../model/admin/role')
const service=require('../../model/admin/service')
const size=require('../../model/admin/size')
const soicial=require('../../model/admin/soicial')
const tag=require('../../model/admin/tag')
const user=require('../../model/admin/user')
const userclass=require('../../model/admin/userclass')
const comment=require('../../model/admin/comment')
const review=require('../../model/admin/review')
const oder=require('../../model/admin/oder')
const cart=require('../../model/admin/cart')
const marketingsale=require('../../model/admin/marketing-sale')
const marketingblog=require('../../model/admin/marketing-blog')
const marketings=require('../../model/admin/marketing')
app.set('view engine', 'ejs');
module.exports={
    product:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }        
        const products= await product.product()
        const topsale=await product.topsale()
        const topview=await product.topview()
        const idproduct=parseInt(req.params.ID);
        const dataproduct= await product.getedit(idproduct)
        const dis=await product.increase(idproduct)
        res.render('page/product',{data:dataproduct,carts:carts,products:products,topsale:topsale,topview:topview})
    },
    product_shop:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }
        const products= await product.product()
        const topsale=await product.topsale()
        const topview=await product.topview()
        const dataproduct=await product.product();
        const idpage=parseInt(req.params.ID)||1;
        var numberpage='';
        if(dataproduct.length> Math.round(dataproduct.length/9)*9){
            numberpage= Math.round(dataproduct.length/9)+1;
           }else{
               numberpage= Math.round(dataproduct.length/9);
           }
           const page=(idpage-1)*9
        const data= await product.pageproduct(page);
        res.render('page/product-shop',{data:data,carts:carts,products:products,topsale:topsale,topview:topview,number:numberpage})
    },
    review:async(req,res)=>{
        const idproduct=parseInt(req.params.ID);
        const iduser=parseInt(req.session.userId);
        const content=req.body.content
        const crea= await review.create(idproduct,iduser,content)
        const dis=await product.reduce(idproduct)
        res.redirect(`/product/${idproduct}`)     
    }
}