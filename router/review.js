const express=require('express');
const router=express.Router();
const controler=require('../controler/admin/review')
router.get('/',controler.review)
router.get('/edit/:ID',controler.getedit)
router.get('/delete/:ID',controler.delete)
module.exports=router;