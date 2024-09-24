const express=require('express');
const router=express.Router();
const controler=require('../../controler/view/checkout')
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

 router.get('/',controler.checkout)
 router.post('/',controler.checkout)
 module.exports=router;