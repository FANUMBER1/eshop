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
const discount=require('../../model/admin/discount')
const size=require('../../model/admin/size')
const tag=require('../../model/admin/tag')
const user=require('../../model/admin/user')
const userclass=require('../../model/admin/userclass')
const review=require('../../model/admin/review')
const oder=require('../../model/admin/oder')
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
        const userclas=await userclass.userclass()
        const topdiscount= await product.topdiscount()
        res.render('page/index',{carts:carts,marketingsale:datamarketingsale,blogs:blogs,
            marketing:datamarketing,profile:profiles,product:products,
            topsale:topsale,topview:topview,userclass:userclas});
    },
    contact:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }        res.render('page/contact',{carts:carts})
    },
    checkout:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        var idoder
        const quantity=[]
        if(iduser>=0){
            carts= await cart.getcart(iduser)
            for(var i=0; i < carts.length;i++){
                quantity.push(req.body[`quant${carts[i].product.id}`])    
            }
            console.log(quantity)
            const cre= await oder.create(carts,quantity,iduser)
            idoder= await oder.getoder(iduser)

    }

        res.render('page/checkout',{carts:carts,idoder:idoder})
    },
    /////blog
    blogSingle:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }        const  idblog=parseInt(req.params.ID);
        const datablog = await blog.getedit(idblog)
        res.render('page/blog-single-sidebar',{data:datablog,carts:carts})
    },
    myblog:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }
        const data=await blog.blog()
       res.render('page/my-blog',{data:data,carts:carts})
    },
    ////cart
    cart:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }        // const iduser=parseInt(req.session.userId)
        // console.log(iduser)
        // var data
        // if(iduser >= 0){
        //  data= await oder.getoder(iduser)
        // }
        // console.log(data)
        res.render('page/cart',{carts:carts})
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
    product:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }        
        const idproduct=parseInt(req.params.ID);
        const dataproduct= await product.getedit(idproduct)
        const dis=await product.increase(idproduct)
        res.render('page/product',{data:dataproduct,carts:carts})
    },
    product_shop:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }
        const dataproduct=await product.product();
        res.render('page/product-shop',{data:dataproduct,carts:carts})
    },
    pagecreate_product:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }        
        const datasize= await size.size();
        const datacolor= await color.color();
        const dataclassfy=await classfy.classfy()
        const datauserclass=await userclass.userclass()
        const datadiscount=await discount.discount()
        res.render('page/create-product',{size:datasize,color:datacolor,classfy:dataclassfy
            ,userclass:datauserclass,discount:datadiscount,carts:carts})
    },
    review:async(req,res)=>{
        const idproduct=parseInt(req.params.ID);
        const iduser=parseInt(req.session.userId);
        const content=req.body.content
        const crea= await review.create(idproduct,iduser,content)
        const dis=await product.reduce(idproduct)
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
            img.push(await adminModel.checkImg(anh[i],data))
        }
        const size=req.body.size;
        const color=req.body.color;
        const crea=await product.createproduct(name,price,quantity,classfy,userclass,discount,
            describe,content,size,color,img)
        res.redirect('/creat-product')
    },  
    ////
    pagecreat_blog:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }      
        const datatag= await tag.tag();
        const datacategori= await categoris.categori();
        res.render('page/create-blog',{tag:datatag,categori:datacategori,carts:carts})
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
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }
        var check=1;
        res.render('page/login',{check,carts:carts})
    },
    checklogin:async(req,res)=>{

    },
    register:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }
        var check=1;
        res.render('page/register',{check,carts:carts})
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
    
    oder:async(req,res)=>{
        const iduser=parseInt(req.session.userId);
        const idproduct=parseInt(req.params.ID);
        const crea= await oder.oder(iduser);
        res.redirect('/cart')
    },
    search:async(req,res)=>{
        const value= req.query.timkiem;
        const productt= await product.product()
        var result = productt.filter( (productt) => {
            return productt.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        })
        const iduser=parseInt(req.session.userId)
        var carts
        if(iduser>=0){
            carts= await cart.getcart(iduser)
        }      
        res.render('page/product-shop',{data:result,carts:carts})
    },
    
}