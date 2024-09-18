const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const users=require('../model/admin/user')
const modellogin=require('../model/login/login')
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
  checklogin:async(req,res)=>{
    const email = req.body.email;
    const data = await modellogin.getuser(email);
    const pass1 = req.body.password;
    var check = 0;
    if (data.length >= 1) {
      for (var i = 0; i < data.length; i++) {
        const match = await bcrypt.compare(pass1, data[i].pass);
        if (match) {
          check = 1;
          var id = data[i].id
        }
      }
    }
    if (check == 1) {
      req.session.userId = id;
      res.redirect('/')
    } else {
      res.render('page/login', { check });
    }
  },
  checkregister:async(req,res,next)=>{
    const email = req.body.email;
    const data = await modellogin.getuser(email);
    console.log(data.length)
    var check=1;
    if(data.length > 0){
       check=0;
       res.render('page/register',{check})
    }else{
      next();
    }
  }
}