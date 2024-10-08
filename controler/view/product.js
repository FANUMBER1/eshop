const express=require('express');
const app = express();
const bcrypt = require('bcrypt');
const product=require('../../model/admin/product')
const profile=require('../../model/admin/profile')
const classfy=require('../../model/admin/classfy')
const user=require('../../model/admin/user')
const review=require('../../model/admin/review')
const cart=require('../../model/admin/cart')
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
        const classfys=await classfy.classfy()
        res.render('page/product',{data:dataproduct,carts:carts,products:products,topsale:topsale,topview:topview,classfys:classfys})
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
        if(dataproduct.length> Math.round(dataproduct.length/6)*6){
            numberpage= Math.round(dataproduct.length/6)+1;
           }else{
               numberpage= Math.round(dataproduct.length/6);
           }
           const page=(idpage-1)*6
        const data= await product.pageproduct(page);
        const classfys=await classfy.classfy()
        res.render('page/product-shop',{data:data,carts:carts,products:products,topsale:topsale,topview:topview,number:numberpage,page:idpage,classfys:classfys})
    },
    review:async(req,res)=>{
        const idproduct=parseInt(req.params.ID);
        const iduser=parseInt(req.session.userId);
        const content=req.body.content
        const crea= await review.create(idproduct,iduser,content)
        const dis=await product.reduce(idproduct)
        res.redirect(`/product/${idproduct}`)     
    },
    likeProduct:async(req,res)=>{
        const idproduct=parseInt(req.params.ID);
        const iduser=parseInt(req.session.userId);
        const likes=await user.likeProduct(iduser,idproduct)
        res.redirect(`/product/${idproduct}`)     
    },
    getLikeProduct:async(req,res)=>{
        const iduser=parseInt(req.session.userId);
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }
        const data=await user.getLikeProduct(iduser)
        const classfys=await classfy.classfy()
        res.render('page/likeproduct',{data:data,carts:carts,classfys:classfys})
    },
    deleteLikeProduct:async(req,res)=>{
        const idproduct=parseInt(req.params.ID);
        const iduser=parseInt(req.session.userId);
        const likes=await user.deleteLikeProduct(iduser,idproduct)
        res.redirect(`/product/like`)     
    },
}