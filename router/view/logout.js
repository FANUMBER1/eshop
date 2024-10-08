const express=require('express');
const router=express.Router();
const controler=require('../../controler/view/login')
const middlewea=require('../../middlewea/logout')
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

 router.get('/',middlewea.logout)
 module.exports=router;