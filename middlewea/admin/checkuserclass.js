const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const express = require('express');
const app = express();
app.set('view engine', 'ejs')
const bcrypt = require('bcrypt');
const product=require('../../model/admin/product')
const modellogin=require('../../model/login/login')
const classfy=require('../../model/admin/classfy')
const color=require('../../model/admin/color')
const discount=require('../../model/admin/discount')
const size=require('../../model/admin/size')
const userclass=require('../../model/admin/userclass')
const oder=require('../../model/admin/oder')
const cart=require('../../model/admin/cart')
module.exports = {
checkName:async(req,res,next)=>{
    const name=req.body.name;
    const data=await userclass.checkname(name)
    if(data.length == 0){
        next();
    }else{
        const data= await userclass.userclass();
        res.render('pageadmin/userclass',{data:data,errorMessage: 'Tên thể loại bị trùng!'})
        }
  }
}