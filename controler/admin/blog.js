const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/blog')
const modelcategori=require('../../model/admin/categori')
const modeltag=require('../../model/admin/tag')
const adminModel=require('../../model/admin/admin')
module.exports={
     /////blog
     blog:async(req,res)=>{
        const data= await model.blog();
        res.render('blog',{data})
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const datacategori=await modelcategori.categori()
        const datatag=await modeltag.tag()
        const data= await model.getedit(id);
        res.render('edit/blog',{data:data,categori:datacategori,tag:datatag})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const name=req.body.name;
        const describe=req.body.describe;
        const content=req.body.content;
        const tags=req.body.tags;
        const categor=req.body.categoris;
        const anh=req.file;
        const data= await model.getedit(id);
        const img= await adminModel.checkImg(anh,data)    
        const up= await model.postedit(id,name,describe,content,tags,categor,img);
        res.redirect('/admin/blog')
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const del=await model.delete(id)
        res.redirect('/admin/blog')
    }

}