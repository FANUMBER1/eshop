const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const express = require('express');
const app = express();
app.set('view engine', 'ejs')
const bcrypt = require('bcrypt');
module.exports = {
checkdonate:async(req,res,next)=>{
    var usertest=req.body.user
    var typer=req.body.typer
    if(usertest== undefined && typer == undefined){
        res.redirect('/admin/coupon/create')
    }else{
        next()
    }
  
  }
}