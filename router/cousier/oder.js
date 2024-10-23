const express=require('express');
const router=express.Router();
const controler=require('../../controler/cousier/oder')
router.get('/',controler.oder)
router.get('/commited',controler.commited)
router.get('/completed',controler.oderComplete)
router.get('/completed/:ID',controler.complete)
router.get('/comfirm/:ID',controler.comfirmOder)
// router.post('/edit/:ID',controler.postedit)
// router.get('/delete/:ID',controler.delete)
module.exports=router;