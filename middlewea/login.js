const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const users=require('../model/admin/user')
const modellogin=require('../model/login/login')
const cart=require('../model/admin/cart')
module.exports = {
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
    const iduser=parseInt(req.session.userId)
    var carts
    if(iduser>=0){
        carts= await cart.getcart(iduser)
    }
    if (check == 1) {
      req.session.userId = id;
      res.redirect('/')
    } else {
      res.render('page/login', { check,carts:carts });
    }
  }
}