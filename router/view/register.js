const express=require('express');
const router=express.Router();
const controler=require('../../controler/view/register')
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
 router.get('/',controler.register)
 router.post('/',upload.single("img"),middlewea.checkregister,middlewea.checkcomfirm,controler.postregister)
 module.exports=router;