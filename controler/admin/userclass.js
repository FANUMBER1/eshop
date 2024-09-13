const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/userclass')
module.exports={
    create:async(req,res)=>{
        const name=req.body.name;
        const create= await model.create(name)
        res.redirect('/admin/userclass') 
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/userclass')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        res.render('./edit/userclass',{data:data})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name=req.body.name;
        const create= await model.postedit(id,name)
        res.redirect('/admin/userclass') 

    },
    userclass:async(req,res)=>{
        const data= await model.userclass();
        res.render('userclass',{data:data})
    },
}