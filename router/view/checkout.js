const express=require('express');
const router=express.Router();
const controler=require('../../controler/view/checkout')
const checkoder=require('../../middlewea/checkproduct')
const middlewea=require('../../middlewea/middlewea')
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

 router.post('/',checkoder.checkoder,checkoder.address,controler.checkout)
 router.get('/',middlewea.requireLogin,controler.checkoutcoupon)
 router.post('/coupon/:ID',controler.coupon)
 module.exports=router;