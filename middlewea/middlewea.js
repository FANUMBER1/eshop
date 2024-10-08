const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const users=require('../model/admin/user')
const modellogin=require('../model/login/login')
const cart=require('../model/admin/cart')
module.exports = {
  requireLogin: (req, res, next) => {
    if (!req.session.userId) {
      res.redirect('/login');
    } else {
      next();
    }
  },
  checkRole: async(req, res, next) => {
    const id = parseInt(req.session.userId);
    const data= await users.getedit(id)
    console.log(data)
    if(data.role.position == 'User' || data.role.position == 'View') {
      res.redirect('/')
    } else {
      next();
    }
  }
  ,
  checkAdmin: async (req, res, next) => {
    const id = parseInt(req.session.userId);
    const data= await users.getedit(id)
    if (data.role.position != 'Admin') {
      res.redirect('/login')
    } else {
      next();
    }
  },
  checkregister:async(req,res,next)=>{
    const email = req.body.email;
    const data = await modellogin.getuser(email);
    const iduser=parseInt(req.session.userId)
    var carts
    if(iduser>=0){
        carts= await cart.getcart(iduser)
    }
    var check=1;
    if(data.length > 0){
       check=0;
       res.render('page/register',{check,carts:carts})
    }else{
      next();
    }
  },
  checkcomfirm:async(req,res,next)=>{
    const iduser=parseInt(req.session.userId)
    var carts
    if(iduser>=0){
        carts= await cart.getcart(iduser)
    }
    const pass = req.body.password;
    const comfirmpass = req.body.comfirmpass;
    var check=3
    if(pass !== comfirmpass){
      res.render('page/register',{check,carts:carts})
    }else{
      next();
    }

  },
  
}