const express=require('express');
const router=express.Router();
const controler=require('../../controler/view/contact')
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

 router.get('/',controler.contact)
 router.get('/:ID',controler.getcontact)
 router.post('/',controler.postcontact)
 module.exports=router;