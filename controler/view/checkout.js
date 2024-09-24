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
    checkout:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        var idoder
        const quantity=[]
        if(iduser>=0){
            carts= await cart.getcart(iduser)
            for(var i=0; i < carts.length;i++){
                const count=carts[i].quantity;
                quantity.push(req.body[`quant${carts[i].product.id}`] ?? count)    
            }
            const cre= await oder.create(carts,quantity,iduser)
            idoder= await oder.getoder(iduser)

    }
        res.render('page/checkout',{carts:carts,idoder:idoder})
    },
}