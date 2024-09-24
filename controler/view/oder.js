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
    oder:async(req,res)=>{
        const iduser=parseInt(req.session.userId);
        const idoder=parseInt(req.params.ID);
        const crea= await oder.oder(iduser,idoder);
        const increa=await product.incresale(idoder)
        res.redirect('/cart')
    },
    getoder:async(req,res)=>{
        const iduser=parseInt(req.session.userId);
        var carts
        var data
        if(iduser>=0){
            carts= await cart.getcart(iduser)
            data=await oder.useroder(iduser)
        }
        res.render('page/useroder',{carts:carts,data:data})
    }
}