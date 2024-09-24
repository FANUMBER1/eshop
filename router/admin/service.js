const express=require('express');
const router=express.Router();
const controler=require('../../controler/admin/service')
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
router.get('/',controler.service)
router.get('/create',controler.getcreate)
router.post('/create',upload.single('img'),controler.postcreate)
router.get('/edit/:ID',controler.getedit)
router.post('/edit/:ID',upload.single('img'),controler.postedit)
router.get('/delete/:ID',controler.delete)
module.exports=router;