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
    }
}