const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/size')
module.exports={
    create:async(req,res)=>{
        const size=req.body.size;
        const create= await model.create(size)
        res.redirect('/admin/size') 
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/aize')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        res.render('./edit/size',{data:data})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const size=req.body.size;
        const create= await model.postedit(id,size)
        res.redirect('/admin/size') 

    },
    size:async(req,res)=>{
        const data= await model.size();
        res.render('size',{data:data})
    },
}