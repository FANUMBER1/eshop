const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const adminmodel=require('../model/admin/edit')
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
    const data= await adminmodel.user(id)
    console.log(data)
    if(data.roles.position == 'User' || data.roles.position == 'View') {
      res.redirect('/')
    } else {
      next();
    }
  }
  ,
  checkAdmin: async (req, res, next) => {
    const id = parseInt(req.session.userId);
    const data= await adminmodel.user(id)
    if (data.roles.position != 'Admin') {
      res.redirect('/login')
    } else {
      next();
    }
  }
}