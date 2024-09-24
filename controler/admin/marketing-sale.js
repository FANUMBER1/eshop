const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const modelactive=require('../../model/admin/active')
const modeldiscount=require('../../model/admin/discount')
const modelimg=require('../../model/admin/admin')
const model=require('../../model/admin/marketing-sale')
module.exports={
    pagecreate:async(req,res)=>{
        const active= await modelactive.active()
        const discount= await modeldiscount.discount()
        res.render('create/marketing-sale',{active:active,discount:discount})
    },
    create:async(req,res)=>{
        const name=req.body.name;
        const link=req.body.link
        const namesale=req.body.namesale
        const data= []
        const anh=req.file
        const img=await modelimg.checkImg(anh,data)
        const discount=parseInt(req.body.discount);
        const active=parseInt(req.body.active);
        const up= await model.create(name,link,img,namesale,discount,active)
        res.redirect('/admin/marketing-sale')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const active= await modelactive.active()
        const discount= await modeldiscount.discount()
        const data= await model.getedit(id)
        res.render('edit/marketing-sale',{data:data,active:active,discount:discount})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        const anh=req.file
        const img=await modelimg.checkImg(anh,data)
        const name=req.body.name;
        const link=req.body.link
        const namesale=req.body.namesale
        const discount=parseInt(req.body.discount);
        const active=parseInt(req.body.active);       
        const up= await model.postedit(id,name,link,img,namesale,discount,active)
        res.redirect('/admin/marketing-sale')
    },
    marketing_sale:async(req,res)=>{
        const active= await modelactive.active()
        const data= await model.marketing_sale();
        res.render('marketing-sale',{data:data,active:active})
    },
    postactive:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const active=parseInt(req.body.active);  
        const up= await model.updateactive(id,active)
        res.redirect('/admin/marketing-sale')
    },
    deletet:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const up= await model.delete(id)
        res.redirect('/admin/marketing-sale')
    }
}