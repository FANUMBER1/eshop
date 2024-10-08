const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const express = require('express');
const app = express();
app.set('view engine', 'ejs')
const bcrypt = require('bcrypt');
const product=require('../model/admin/product')
const modellogin=require('../model/login/login')
const classfy=require('../model/admin/classfy')
const color=require('../model/admin/color')
const discount=require('../model/admin/discount')
const size=require('../model/admin/size')
const userclass=require('../model/admin/userclass')
const oder=require('../model/admin/oder')
const cart=require('../model/admin/cart')
module.exports = {
      checkName:async(req,res,next)=>{
        const name=req.body.name;
        const data=await product.checkname(name)
        if(data.length = 0){
            next();
        }else{
            const datasize= await size.size();
            const datacolor= await color.color();
            const dataclassfy=await classfy.classfy()
            const datauserclass=await userclass.userclass()
            const datadiscount=await discount.discount()
            var check=1;
            res.render('create/product',{size:datasize,color:datacolor,classfy:dataclassfy
                ,userclass:datauserclass,discount:datadiscount,check:check})
        }
      },
      checkoder:async(req,res,next)=>{
       const idproduct=req.body.products
       if(idproduct == undefined){
       const iduser=parseInt(req.session.userId)
       var carts
       if(iduser>=0){
           carts= await cart.getcart(iduser)
       }     
       const classfys=await classfy.classfy() 
       res.render('page/cart',{carts:carts,classfys:classfy, errorMessage: 'Bạn chưa chọn sản phẩm nào!'})
      }else{
        next()
      }

      }

}