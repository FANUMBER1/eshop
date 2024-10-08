const express=require('express');
const router=express.Router();
const controler=require('../../controler/view/search')
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
 router.post('/',controler.search)
//  router.get('/classfy/:ID',controler.searchclassfy)
 router.get('/userclass/:ID',controler.searchuserclass)
 router.get('/blog',controler.searchh)
 router.get('/categori/:ID',controler.searchblog)
 router.get('/tag/:ID',controler.searchtag)
 module.exports=router;