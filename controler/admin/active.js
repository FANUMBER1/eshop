const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/active')
module.exports={
    create:async(req,res)=>{
        const name=req.body.name;
        const create= await model.create(name)
        res.redirect('/admin/active') 
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/active')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        res.render('./edit/active',{data:data})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name=req.body.name;
        const create= await model.postedit(id,name)
        res.redirect('/admin/active') 

    },
    active:async(req,res)=>{
        const data= await model.active();
        res.render('pageadmin/active',{data:data})
    }
}