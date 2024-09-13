const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/role')
module.exports={
    create:async(req,res)=>{
        const position=req.body.position;
        const create= await model.create(position)
        res.redirect('/admin/role') 
    },
   delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/role')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        res.render('./edit/inforRole',{data:data})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const position=req.body.position;
        const create= await model.postedit(id,position)
        res.redirect('/admin/role') 

    },
    role:async(req,res)=>{
        const data= await model.role();
        res.render('inforRole',{data:data})
    }
}