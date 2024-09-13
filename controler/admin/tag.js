const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/tag')
const page=require('../../model/admin/page')
module.exports={
    create:async(req,res)=>{
        const name=req.body.name;
        const create= await model.create(name)
        res.redirect('/admin/tag') 
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/tag')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.geteidt(id)
        res.render('./edit/tag',{data:data})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name=req.body.name;
        const create= await model.postedit(id,name)
        res.redirect('/admin/tag') 

    },
    tag:async(req,res)=>{
        const data= await model.tag();
        res.render('tag',{data:data})
    },
}