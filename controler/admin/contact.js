const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/contact')
module.exports={
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/contact')
    }
}