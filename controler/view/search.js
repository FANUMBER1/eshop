const express=require('express');
const app = express();
const bcrypt = require('bcrypt');
const product=require('../../model/admin/product')
const profile=require('../../model/admin/profile')
const blog=require('../../model/admin/blog')
const classfy=require('../../model/admin/classfy')
const cart=require('../../model/admin/cart')
app.set('view engine', 'ejs');
module.exports={
    search:async(req,res)=>{
        const products= await product.product()
        const topsale=await product.topsale()
        const topview=await product.topview()
        const tkclassfy=parseInt(req.body.classfy)
        const value= req.body.timkiem
        var result
        if(tkclassfy >= 0){
            const dataclasss=await product.productclassfy(tkclassfy)
             result = dataclasss.filter( (dataclasss) => {
            return dataclasss.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
            })
            }else{
            const productt= await product.product()
            result = productt.filter( (productt) => {
            return productt.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
            })
        }
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }      
        var numberpage
        const classfys=await classfy.classfy()

        res.render('page/product-shop',{data:result,carts:carts,number:numberpage,products:products,topsale:topsale,topview:topview,classfys:classfys})
    },
    // searchclassfy:async(req,res)=>{
    //     const name=parseInt(req.params.ID)
    //     const products= await product.product()
    //     const topsale=await product.topsale()
    //     const topview=await product.topview()
    //     const value= req.query.timkiem
    //     const iduser=parseInt(req.session.userId)
    //     var carts
    //     if(iduser>=0){
    //         carts= await cart.getcart(iduser)
    //     }      
    //     var numberpage
    //     const result= await product.productclassfy(name)
    //     const classfys=await classfy.classfy()

    //     res.render('page/product-shop',{data:result,carts:carts,number:numberpage,products:products,topsale:topsale,topview:topview,classfys:classfys})
    // },
    searchuserclass:async(req,res)=>{
        const name=parseInt(req.params.ID)
        const products= await product.product()
        const topsale=await product.topsale()
        const topview=await product.topview()
        const value= req.query.timkiem
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }      
        var numberpage
        const result= await product.productUserclass(name)
        const classfys=await classfy.classfy()

        res.render('page/product-shop',{data:result,carts:carts,number:numberpage,products:products,topsale:topsale,topview:topview,classfys:classfys})
    },
    searchblog:async(req,res)=>{
        const value= parseInt(req.params.ID)
        const blogs= await blog.blog()
       const result= await blog.blogcategori(value)
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }     
        var numberpage; 
        const classfys=await classfy.classfy()

        res.render('page/my-blog',{data:result,carts:carts,number:numberpage,classfys:classfys})
    },
    searchtag:async(req,res)=>{
        const value= parseInt(req.params.ID)
        const blogs= await blog.blog()
       const result= await blog.blogtag(value)
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }      
        var numberpage;
        const classfys=await classfy.classfy()

        res.render('page/my-blog',{data:result,carts:carts,number:numberpage,classfys:classfys})
    },
    searchh:async(req,res)=>{
        const value= req.query.timkiem
        const blogs= await blog.blog()
        var result = blogs.filter( (blogs) => {
            return blogs.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        })
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }      
        const idpage=parseInt(req.params.ID)||1
        var numberpage;
        const classfys=await classfy.classfy()
        res.render('page/my-blog',{data:result,carts:carts,number:numberpage,classfys:classfys})
    }
}