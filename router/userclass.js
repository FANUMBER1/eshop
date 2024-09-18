const express=require('express');
const router=express.Router();
const controler=require('../controler/admin/userclass')
router.get('/',controler.userclass)
router.post('/create',controler.create)
router.get('/edit/:ID',controler.getedit)
router.post('/edit/:ID',controler.postedit)
router.get('/delete/:ID',controler.delete)
module.exports=router;