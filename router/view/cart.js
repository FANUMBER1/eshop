const express=require('express');
const router=express.Router();
const controler=require('../../controler/view/cart')
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

 router.get('/',controler.cart)
 router.get('/oder-comfirm',middlewea.requireLogin,controler.oderComfirm)
 router.get('/oder-delivery',middlewea.requireLogin,controler.oderDelivery)
 router.get('/oder-transit',middlewea.requireLogin,controler.oderTransit)
 router.get('/oder-completed',middlewea.requireLogin,controler.oderCompleted)
 router.post('/:ID',middlewea.requireLogin,controler.creat_cart)
 router.get('/:ID',middlewea.requireLogin,controler.creat_cart)
 router.get('/delete/:ID',controler.remove)
 module.exports=router;