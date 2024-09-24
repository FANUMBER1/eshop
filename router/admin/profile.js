const express=require('express');
const router=express.Router();
const controler=require('../../controler/admin/profile')
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
router.get('/',controler.profile)
router.get('/edit',controler.getedit)
router.post('/edit',upload.single('img'),controler.postedit)
module.exports=router;