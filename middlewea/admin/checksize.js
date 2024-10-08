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
module.exports = {
checkName:async(req,res,next)=>{
    const name=req.body.size;
    console.log(name)
    const data=await size.checksize(name)
    console.log(data)
    if(data.length == 0){
        next();
    }else{
        console.log(1)
        const data= await size.size();
        res.render('pageadmin/size',{data:data,errorMessage: 'Tên thể loại bị trùng!'})
        }
  }
}