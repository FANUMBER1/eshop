const express=require('express');
const router=express.Router();
const controler=require('../../controler/view/service')
router.get('/',controler.service)
module.exports=router;