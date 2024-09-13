const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/service')
module.exports={
    getcreate:async(req,res)=>{
        res.render('./create/service')
    },
    postcreate:async(req,res)=>{
        const name=req.body.name;
        const content=req.body.content;
        const anh=req.file;
        const data=[];
        const img= await creat.checkImg(anh,data)
        const create= await model.create(name,content,img)
        res.redirect('/admin/service')
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/service')  
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        res.render('./edit/service',{data:data})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name=req.body.name;
        const content=req.body.content;
        const data= await model.getedit(id)
        const anh=req.file
        const img=await create.checkImg(anh,data)
        const creat= await model.postedit(id,name,content,img)
        res.redirect('/admin/service') 

    },
    service:async(req,res)=>{
        const data= await model.service();
        res.render('service',{data:data})
    }
}