const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/oder')
const product=require('../../model/admin/product')
module.exports={
      oder:async(req,res)=>{
        const data= await model.cousierOder(2);
        res.render('cousier/oder',{data:data})
      },
      
      comfirmOder:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const up=await model.comfirmCounsierOder(id)
        res.redirect('/cousier')
      },
      commited:async(req,res)=>{
        const data= await model.cousierOder(3);
        res.render('cousier/oder -comfirm',{data:data})
      },
      oderComplete:async(req,res)=>{
        const data= await model.cousierOder(4);
        res.render('cousier/oder-completed',{data:data})
      },
      complete:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const up=await model.compelteOder(id)
        res.redirect('/cousier/commited')
      },
}