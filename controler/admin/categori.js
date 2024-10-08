const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/categori')
module.exports={
    create:async(req,res)=>{
        const name=req.body.name;
        const create= await model.create(name)
        res.redirect('/admin/categori') 
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/categori')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        res.render('./edit/categori',{data:data})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name=req.body.name;
        const create= await model.postedit(id,name)
        res.redirect('/admin/name') 

    },
    categori:async(req,res)=>{
        const data= await model.categori();
        var faless
        res.render('pageadmin/categori',{data:data,errorMessage:faless})
    }
}