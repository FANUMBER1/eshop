const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const modelactive=require('../../model/admin/active')
const modelimg=require('../../model/admin/admin')
const model=require('../../model/admin/marketing')
module.exports={
    pagecreate:async(req,res)=>{
        const active= await modelactive.active()
        res.render('create/marketing',{active:active})
    },
    create:async(req,res)=>{
        const name=req.body.name;
        const link=req.body.link
        const namesale=req.body.namesale
        const data= []
        const anh=req.file
        const img=await modelimg.checkImg(anh,data)
        const active=parseInt(req.body.active);
        const describe=req.body.describe
        const up= await model.create(name,link,img,namesale,active,describe)
        res.redirect('/admin/marketing')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const active= await modelactive.active()
        const data= await model.getedit(id)
        res.render('edit/marketing',{data:data,active:active})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        const anh=req.file
        const img=await modelimg.checkImg(anh,data)
        const name=req.body.name;
        const link=req.body.link
        const namesale=req.body.namesale
        const active=parseInt(req.body.active);
        const describe=req.body.describe       
        const up= await model.postedit(id,name,link,img,namesale,active,describe)
        res.redirect('/admin/marketing')
    },
    marketing:async(req,res)=>{
        const active= await modelactive.active()
        const data= await model.marketing();
        res.render('pageadmin/marketing',{data:data,active:active})
    },
    postactive:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const active=parseInt(req.body.active);  
        const up= await model.updateactive(id,active)
        res.redirect('/admin/marketing')
    },
    deletet:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const up= await model.delete(id)
        res.redirect('/admin/marketing')
    }
}