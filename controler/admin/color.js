const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/color')
module.exports={
    create:async(req,res)=>{
        const color=req.body.color;
        const name=req.body.name;
        const create= await model.create(color,name)
        res.redirect('/admin/color') 
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/color')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        res.render('./edit/color',{data:data})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const color=req.body.color;
        const name=req.body.name
        const create= await model.postedit(id,color,name)
        res.redirect('/admin/color') 

    },
    color:async(req,res)=>{
        const data= await model.color();
        res.render('color',{data:data})
    }
}