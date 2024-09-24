const express=require('express');
const router=express.Router();
const controler=require('../../controler/view/blog')
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

 router.get('/',controler.myblog)
 router.get('/page/:ID',controler.myblog)
 router.get('/:ID',controler.blogSingle)
 router.post('/comment/:ID',middlewea.requireLogin,controler.comment)
 module.exports=router;