const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/classfy')
module.exports={
    create:async(req,res)=>{
        const name=req.body.name;
        const create= await model.create(name)
        res.redirect('/admin/classfy') 
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/classfy')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        res.render('./edit/classfy',{data:data})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name=req.body.name;
        const create= await model.postedit(id,name)
        res.redirect('/admin/classfy') 

    },
    classfy:async(req,res)=>{
        const data= await model.classfy();
        res.render('classfy',{data:data})
    }
}