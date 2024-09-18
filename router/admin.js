const express=require('express');
const router=express.Router();
const product=require('./product')
const profile=require('./profile')
const blog=require('./blog')
const categori=require('./categori')
const classfy=require('./classfy')
const color=require('./color')
const contact=require('./contact')
const discount=require('./discount')
const role=require('./role')
const service=require('./service')
const size=require('./size')
const soicial=require('./soicial')
const tag=require('./tag')
const comment=require('./comment')
const user=require('./user')
const userclass=require('./userclass')
const review=require('./review')
const view=require('./view')
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
////////profile
router.use('/',profile)
/////////Soicial
router.use('/soicial',soicial)
/////////
router.use('/contact',contact)
///////role
router.use('/role',role)
////////USER
router.use('/user',user)
///////tag
router.use('/tag',tag)
////color
router.use('/color',color)
///size
router.use('/size',size)
////categori
router.use('/categori',categori)
///////service
router.use('/service',service)
///size
router.use('/size',size)
///size
router.use('/discount',discount)
///size
router.use('/classfy',classfy)
/////product
router.use('/product',product)
router.use('/userclass',userclass)
/////Blog
router.use('/blog',blog)/////User
router.use('/inforuser',user)
router.use('/comment',comment)
router.use('/review',review)
module.exports=router;