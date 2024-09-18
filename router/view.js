const express=require('express');
const router=express.Router();
const multer = require('multer');
const viewControler=require('../controler/view/view')
const middlewea=require('../middlewea/middlewea')
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
router.get('/product/:ID',viewControler.product)
router.post('/product/review/:ID',middlewea.requireLogin,viewControler.review)
router.get('/product-shop',viewControler.product_shop)
router.get('/creat-product',middlewea.requireLogin,viewControler.pagecreate_product)
router.post('/creat-product',upload.array("img",5),viewControler.creat_product)
router.get('/creat-blog',middlewea.requireLogin,viewControler.pagecreat_blog)
router.post('/creat-blog',upload.single("img"),viewControler.creat_blog)
router.post('/blog/comment/:ID',middlewea.requireLogin,viewControler.comment)

/////LOGIN
router.get('/login',viewControler.login)
router.post('/login',middlewea.checklogin)
router.get('/register',viewControler.register)
router.post('/register',middlewea.checkregister,upload.single("img"),viewControler.postregister)
module.exports=router;