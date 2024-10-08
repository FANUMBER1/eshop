const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const express = require('express');
const app = express();
app.set('view engine', 'ejs')
const bcrypt = require('bcrypt');
const product=require('../model/admin/product')
const modellogin=require('../model/login/login')
const address=require('../model/admin/user_address')
module.exports = {
    check:async(req,res,next)=>{
        const idaddress=parseInt(req.query.select)
        if(idaddress >=0 ){
          next()
        }else{
            res.redirect('/my-account/address')
        }
    }
}