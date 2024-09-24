const express=require('express');
const router=express.Router();
const controler=require('../../controler/view/product')
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
 router.get('/',controler.product_shop)
 router.get('/page/:ID',controler.product_shop)
 router.get('/:ID',controler.product)
 router.post('/review/:ID',middlewea.requireLogin,controler.review)
 module.exports=router;