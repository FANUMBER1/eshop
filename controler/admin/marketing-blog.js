const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const modelactive=require('../../model/admin/active')
const modelimg=require('../../model/admin/admin')
const model=require('../../model/admin/marketing-blog')
module.exports={
    pagecreate:async(req,res)=>{
        const active= await modelactive.active()
        res.render('create/marketing-blog',{active:active})
    },
    create:async(req,res)=>{
        const name=req.body.name;
        const link=req.body.link
        const data= []
        const anh=req.file
        const img=await modelimg.checkImg(anh,data)
        const active=parseInt(req.body.active);
        const up= await model.create(name,link,img,active)
        res.redirect('/admin/marketing-blog')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const active= await modelactive.active()
        const data= await model.getedit(id)
        res.render('edit/marketing-blog',{data:data,active:active})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        const anh=req.file
        const img=await modelimg.checkImg(anh,data)
        const name=req.body.name;
        const link=req.body.link
        const active=parseInt(req.body.active);       
        const up= await model.postedit(id,name,link,img,active)
        res.redirect('/admin/marketing-blog')
    },
    marketing_blog:async(req,res)=>{
        const active= await modelactive.active()
        const data= await model.marketing_blog();
        res.render('pageadmin/marketing-blog',{data:data,active:active})
    },
    postactive:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const active=parseInt(req.body.active);  
        const up= await model.updateactive(id,active)
        res.redirect('/admin/marketing-blog')
    },
    deletet:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const up= await model.delete(id)
        res.redirect('/admin/marketing-blog')
    }
}