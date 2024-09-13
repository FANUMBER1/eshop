const express=require('express');
const router=express.Router();
const multer = require('multer');
const viewControler=require('../controler/view/view')
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
router.get('/',viewControler.index)
router.get('/cart',viewControler.cart)
router.get('/contact',viewControler.contact)
router.get('/checkout',viewControler.checkout)
router.get('/blog/:ID',viewControler.blogSingle)
router.get('/my-blog',viewControler.myblog)
router.get('/product',viewControler.product)
router.get('/creat-product',viewControler.pagecreate_product)
router.post('/creat-product',viewControler.creat_product)
router.get('/creat-blog',viewControler.pagecreat_blog)
router.post('/creat-blog',upload.single("img"),viewControler.creat_blog)


/////LOGIN
router.get('/login',viewControler.login)
router.get('/register',viewControler.register)
router.post('/register',viewControler.postregister)
module.exports=router;