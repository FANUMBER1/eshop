const express=require('express');
const router=express.Router();
const controler=require('../../controler/admin/product')
const multer = require('multer');
const checkimg=require('../../middlewea/checkimg')
const checkproduct=require('../../middlewea/checkproduct')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/upload/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const fileFilter = (req, file, cb) => {
    // Chấp nhận file nếu là ảnh, từ chối nếu không phải
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true);
    } else {
      // Từ chối file, không upload
      cb(new Error('File phải là ảnh!'), false);
    }
  };
  
  // Cấu hình upload với multer
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5 // Giới hạn kích thước file là 5MB
    },
    fileFilter: fileFilter
  });
router.get('/',controler.product)
router.get('/create',controler.getcreate)
router.post('/create',upload.array("img",4),checkproduct.checkName,controler.create)
router.get('/edit/:ID',controler.getedit)
router.post('/edit/:ID',controler.postedit)
router.get('/delete/:ID',controler.delete)
module.exports=router;