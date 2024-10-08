const express=require('express');
const router=express.Router();
const controler=require('../../controler/admin/tag')
const checkvalue=require('../../middlewea/admin/checktag')
router.get('/',controler.tag)
router.post('/create',checkvalue.checkName,controler.create)
router.get('/edit/:ID',controler.getedit)
router.post('/edit/:ID',controler.postedit)
router.get('/delete/:ID',controler.delete)
module.exports=router;