const express=require('express');
const router=express.Router();
const controler=require('../../controler/admin/coupon')
const checkvalue=require('../../middlewea/admin/checkdiscount')
router.get('/',controler.coupon)
router.get('/create',controler.getCreate)
router.post('/create',controler.postCreate)
router.get('/active/:ID',controler.getactive)
router.get('/edit/:ID',controler.getedit)
router.get('/donate',controler.getdonate)
router.post('/donate',controler.postdonate)
// router.post('/edit/:ID',controler.postedit)
router.get('/delete/:ID',controler.delete)
module.exports=router;