const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const users=require('../model/admin/user')
const modellogin=require('../model/login/login')
const cart=require('../model/admin/cart')
module.exports = {
logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  }
}