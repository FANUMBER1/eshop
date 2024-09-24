const express=require('express');
const router=express.Router();
const controler=require('../../controler/admin/contact')
router.get('/',controler.contact)
// router.get('/edit/:ID',controler.getedit)
// router.post('/edit/:ID',controler.postedit)
router.get('/delete/:ID',controler.delete)
module.exports=router;