const express=require('express');
const app = express();
const bcrypt = require('bcrypt');
const adminModel=require('../../model/admin/admin')
const product=require('../../model/admin/product')
const profile=require('../../model/admin/profile')
const blog=require('../../model/admin/blog')
const classfy=require('../../model/admin/classfy')
const tag=require('../../model/admin/tag')
const comment=require('../../model/admin/comment')
const cart=require('../../model/admin/cart')
app.set('view engine', 'ejs');
const now = new Date();
const day = now.getDate();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const month = monthNames[now.getMonth()];
const year = now.getFullYear();
const hours = now.getHours(); 
const minutes = now.getMinutes(); 
const seconds = now.getSeconds(); 
let period = hours >= 12 ? 'PM' : 'AM';
let hour12 = hours % 12 || 12; 
module.exports={
    blogSingle:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }        
        const  idblog=parseInt(req.params.ID);
        const  datatag=await tag.tag()
        const datablog = await blog.getedit(idblog)
        const datas=await blog.blog()
        const classfys=await classfy.classfy()

        res.render('page/blog-single-sidebar',{datas:datas,data:datablog,carts:carts,tag:datatag,classfys:classfys})
    },
    myblog:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }
        const data=await blog.blog()
        const idpage=parseInt(req.params.ID)||1
        var numberpage;
        if(data.length> Math.round(data.length/4)*4){
         numberpage= Math.round(data.length/4)+1;
        }else{
            numberpage= Math.round(data.length/4);
        }
        const page=(idpage-1)*4
        const datablog= await blog.pageblog(page);
        const classfys=await classfy.classfy()
       res.render('page/my-blog',{data:datablog,carts:carts,number:numberpage,page:idpage,classfys:classfys})
    },
    comment:async(req,res)=>{
        const idblog=parseInt(req.params.ID);
        const iduser=parseInt(req.session.userId);
        const content=req.body.message
        const time=` ${month} ${day},${year} At ${hour12}:${minutes} ${period}`    
        const  crea= await comment.create(idblog,iduser,content,time)
        res.redirect(`/blog/${idblog}`)     
    },
}