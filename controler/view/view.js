const express=require('express');
const app = express();
const bcrypt = require('bcrypt');
const adminModel=require('../../model/admin/create')
const page=require('../../model/admin/page')
const edit=require('../../model/admin/edit')
app.set('view engine', 'ejs');
module.exports={
    index:async(req,res)=>{
        res.render('page/index');
    },
    contact:async(req,res)=>{
        res.render('page/contact')
    },
    checkout:async(req,res)=>{
        res.render('page/checkout')
    },
    /////blog
    blogSingle:async(req,res)=>{
        const  idblog=parseInt(req.params.ID);
        const data = await edit.blog(idblog)
        console.log(data)
        res.render('page/blog-single-sidebar',{data:data})
    },
    myblog:async(req,res)=>{
        const data=await page.blog()
       res.render('page/my-blog',{data:data})
    },
    ////cart
    cart:async(req,res)=>{
        res.render('page/cart')
    },
    product:async(req,res)=>{
        res.render('page/product')
    },
    pagecreate_product:async(req,res)=>{
        const datasize= await page.size();
        const datacolor= await page.color();
        const dataclassfy=await page.classfy()
        const datauserclass=await page.userclass()
        const datadiscount=await page.discount()
        res.render('page/create-product',{size:datasize,color:datacolor,classfy:dataclassfy
            ,userclass:datauserclass,discount:datadiscount})
    },
    creat_product:async(req,res)=>{
        const name=req.body.name;
        const price=req.body.price;
        const quantity=req.body.quantity;
        const classfy=parseInt(req.body.classfy);
        const userclass=parseInt(req.body.userclass);
        const discount=parseInt(req.body.discount);
        const describe=req.body.describe;
        const content=req.body.content;
        const size=req.body.size;
        const color=req.body.color;
        const crea=await adminModel.createproduct(name,price,quantity,classfy,userclass,discount,
            describe,content,size,color)
        res.redirect('/creat-product')
    },  
    ////
    pagecreat_blog:async(req,res)=>{
        const datatag= await page.tag();
        const datacategori= await page.categori();
        res.render('page/create-blog',{tag:datatag,categori:datacategori})
    }, 
    creat_blog:async(req,res)=>{
        const name=req.body.name;
        const describe=req.body.describe;
        const content=req.body.content;
        const tag=req.body.tag;
        const anh=req.file;
        const data=[];
        const img= await adminModel.checkImg(anh,data)
        const categori=req.body.categori;
        const crea=await adminModel.createblog(name,describe,content,img,tag,categori)
        res.redirect('/creat-blog')
    },
    login:async(req,res)=>{
        res.render('page/login')
    },
    checklogin:async(req,res)=>{

    },
    register:async(req,res)=>{
        res.render('page/register')
    },
    postregister:async(req,res)=>{
        const name= req.body.name;
        const email=req.body.email;
        const pass0=req.body.pass;
        const pas = bcrypt.hashSync(pass0, 10);
        const firstname=req.body.firstname;
        const lastname=req.body.lastname;
        const phone=req.body.phone;
        const country=req.body.country;
        const state=req.body.state;
        const address1=req.body.address1;
        const address2=req.body.address2;
        const code=req.body.code;
        const company=req.body.company;
        const img=req.body.img;
        const role=4;
        const crea= adminModel.createuser(name,email,pas,img,firstname,lastname,phone,country,state,
            address1,address2,code,company,role);
        res.redirect('/login')
    }
}