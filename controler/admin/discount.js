const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/discount')
module.exports={
    create:async(req,res)=>{
        const name=req.body.name;
        const create= await model.discount(name)
        res.redirect('/admin/discount') 
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/discount')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        res.render('./edit/discount',{data:data})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name=req.body.name;
        console.log(name)
        const create= await model.postedit(id,name)
        res.redirect('/admin/discount') 
    },
    discount:async(req,res)=>{
        const data= await model.discount();
        res.render('discount',{data:data})
    },
}