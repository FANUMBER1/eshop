const express=require('express');
const router=express.Router();
const controler=require('../../controler/admin/oder')
router.get('/',controler.oder)
router.get('/edit/:ID',controler.getdit)
// router.post('/edit/:ID',controler.postedit)
// router.get('/delete/:ID',controler.delete)
module.exports=router;