const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const express = require('express');
const app = express();
app.set('view engine', 'ejs')
const bcrypt = require('bcrypt');
const product=require('../../model/admin/product')
const classfy=require('../../model/admin/classfy')
const color=require('../../model/admin/color')
const discount=require('../../model/admin/discount')
const size=require('../../model/admin/size')
const userclass=require('../../model/admin/userclass')
const categori=require('../../model/admin/categori')
const cart=require('../../model/admin/cart')
module.exports = {
checkName:async(req,res,next)=>{
    const name=req.body.name;
    const data=await discount.checkname(name)
    if(data.length == 0){
        next();
    }else{
        const data= await discount.discount();
        res.render('pageadmin/discount',{data:data,errorMessage: 'Bị trùng giá trị giảm giá!'})
        }
  }
}