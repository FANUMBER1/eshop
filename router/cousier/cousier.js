const express=require('express');
const router=express.Router();
const viewControler=require('../../controler/view/view')
const middlewea=require('../../middlewea/middlewea')
const login=require('./login')
const register=require('./register')
const logout=require('./logout')
const odership=require('./oder')
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
router.use('/',odership)
router.use('/login',login)
router.use('/logout',logout)
router.use('/register',register)
module.exports=router;