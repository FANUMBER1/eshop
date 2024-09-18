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
        const data = await blog.getedit(idblog)
        res.render('page/blog-single-sidebar',{data:data})
    },
    myblog:async(req,res)=>{
        const data=await blog.blog()
       res.render('page/my-blog',{data:data})
    },
    ////cart
    cart:async(req,res)=>{
        res.render('page/cart')
    },
    product:async(req,res)=>{
        const idproduct=parseInt(req.params.ID);
        const dataproduct= await product.getedit(idproduct)
        res.render('page/product',{data:dataproduct})
    },
    product_shop:async(req,res)=>{
        const dataproduct=await product.product();
        res.render('page/product-shop',{data:dataproduct})
    },
    pagecreate_product:async(req,res)=>{
        const datasize= await size.size();
        const datacolor= await color.color();
        const dataclassfy=await classfy.classfy()
        const datauserclass=await userclass.userclass()
        const datadiscount=await discount.discount()
        res.render('page/create-product',{size:datasize,color:datacolor,classfy:dataclassfy
            ,userclass:datauserclass,discount:datadiscount})
    },
    review:async(req,res)=>{
        const idproduct=parseInt(req.params.ID);
        const iduser=parseInt(req.session.userId);
        const content=req.body.content
        const crea= await review.create(idproduct,iduser,content)
        res.redirect(`/product/${idproduct}`)     
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
        const data=[]
        const anh=req.files;
        const img=[]
        for(var i=0; i< anh.length ; i++){
            console.log(anh[i].filename)
            img.push(await adminModel.checkImg(anh[i],data))
        }
        console.log(img)
        const size=req.body.size;
        const color=req.body.color;
        const crea=await product.createproduct(name,price,quantity,classfy,userclass,discount,
            describe,content,size,color,img)
        res.redirect('/creat-product')
    },  
    ////
    pagecreat_blog:async(req,res)=>{
        const datatag= await tag.tag();
        const datacategori= await categoris.categori();
        res.render('page/create-blog',{tag:datatag,categori:datacategori})
    }, 
    creat_blog:async(req,res)=>{
        const iduser=parseInt(req.session.userId);
        const name=req.body.name;
        const describe=req.body.describe;
        const content=req.body.content;
        const tag=req.body.tag;
        const categor=req.body.catego;
        const anh=req.file;
        const data=[];
        const img= await adminModel.checkImg(anh,data)
        const crea=await blog.create(name,describe,content,img,tag,categor,iduser)
        res.redirect('/creat-blog')
    },
    login:async(req,res)=>{
        var check=1;
        res.render('page/login',{check})
    },
    checklogin:async(req,res)=>{

    },
    register:async(req,res)=>{
        var check=1;
        res.render('page/register',{check})
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
        const data=[]
        const anh=req.file;
        const img= adminModel.checkImg(anh,data)
        const role=2;
        const crea= user.create(name,email,pas,img,firstname,lastname,phone,country,state,
            address1,address2,code,company,role);
        res.redirect('/login')
    },
    comment:async(req,res)=>{
        const idblog=parseInt(req.params.ID);
        const iduser=parseInt(req.session.userId);
        const content=req.body.message
        const crea= await comment.create(idblog,iduser,content)
        res.redirect(`/blog/${idblog}`)     
    }
}