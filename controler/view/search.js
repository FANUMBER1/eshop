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
    search:async(req,res)=>{
        const products= await product.product()
        const topsale=await product.topsale()
        const topview=await product.topview()
        const value= req.query.timkiem
        const productt= await product.product()
        var result = productt.filter( (productt) => {
            return productt.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        })
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }      
        var numberpage
        res.render('page/product-shop',{data:result,carts:carts,number:numberpage,products:products,topsale:topsale,topview:topview})
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
        res.render('page/my-blog',{data:result,carts:carts,number:numberpage})
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
        res.render('page/my-blog',{data:result,carts:carts,number:numberpage})
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
        res.render('page/my-blog',{data:result,carts:carts,number:numberpage})
    }
}