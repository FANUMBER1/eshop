const express=require('express');
const router=express.Router();
const viewControler=require('../../controler/view/view')
const middlewea=require('../../middlewea/middlewea')
const mainn=require('./index')
const cart=require('./cart')
const blog=require('./blog')
const login=require('./login')
const products=require('./product')
const register=require('./register')
const checkout=require('./checkout')
const contact=require('./contact')
const oder=require('./oder')
const search=require('./search')
const logout=require('./logout')
const account=require('./my-account')
const service=require('./service')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/upload/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
 const upload = multer({ storage: storage }); 
/////PAGE
router.use('/',mainn)
router.use('/cart',cart)
router.use('/contact',contact)
router.use('/checkout',middlewea.requireLogin,checkout)
router.use('/blog',blog)
router.use('/product',products)
router.use('/oder',middlewea.requireLogin,oder)
router.use('/my-account',middlewea.requireLogin,account)
router.use('/service',service)
/////LOGIN
router.use('/login',login)
router.use('/logout',logout)
router.use('/register',register)
router.use('/search',search)

module.exports=router;