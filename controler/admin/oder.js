const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/oder')
const product=require('../../model/admin/product')
module.exports={
      oder:async(req,res)=>{
        const data= await model.odered();
        const dataproduct= await product.product();
        res.render('oder',{data:data,product:dataproduct})
      },
      getdit:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const data= await model.odered(id);
        res.render('edit/oder',{data:data})
      }
}