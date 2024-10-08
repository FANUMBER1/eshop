const express=require('express');
const router=express.Router();
const controler=require('../../controler/admin/classfy')
const checkvalue=require('../../middlewea/admin/checkclassfy')
router.get('/',controler.classfy)
router.post('/create',checkvalue.checkName,controler.create)
router.get('/edit/:ID',controler.getedit)
router.post('/edit/:ID',controler.postedit)
router.get('/delete/:ID',controler.delete)
module.exports=router;