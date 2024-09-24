const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/blog')
const modelcategori=require('../../model/admin/categori')
const modeltag=require('../../model/admin/tag')
const adminModel=require('../../model/admin/admin')
const now = new Date();
const day = now.getDate();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const month = monthNames[now.getMonth()];
const year = now.getFullYear();
const hours = now.getHours(); 
const minutes = now.getMinutes(); 
const seconds = now.getSeconds(); 
let period = hours >= 12 ? 'PM' : 'AM';
let hour12 = hours % 12 || 12; 
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
    },
    getcreate:async(req,res)=>{    
        const datatag= await modeltag.tag();
        const datacategori= await modelcategori.categori();
        res.render('create/blog',{tag:datatag,categori:datacategori})
    },
    postcreate:async(req,res)=>{
        const iduser=parseInt(req.session.userId);
        const name=req.body.name;
        const describe=req.body.describe;
        const content=req.body.content;
        const tag=req.body.tag;
        const categor=req.body.catego;
        const anh=req.file;
        const data=[];
        const img= await adminModel.checkImg(anh,data)
        const time=`${month} ${day},${year}`; 
        const crea=await model.create(name,describe,content,img,tag,categor,iduser,time)
        res.redirect('/admin/blog')
    }

}