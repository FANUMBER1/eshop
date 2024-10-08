const express=require('express');
const router=express.Router();
const controler=require('../../controler/view/my-account')
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
 router.get('/',controler.account)
 router.post('/',controler.changeAccount)
 router.get('/address',controler.address)
 router.post('/address',controler.postaddress)
 router.post('/address/save',controler.saveaddress)
 router.get('/address/delete/:ID',controler.deleteaddress)
 module.exports=router;