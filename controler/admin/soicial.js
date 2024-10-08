const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/soicial')
const create=require('../../model/admin/admin')
module.exports={
    create:async(req,res)=>{
        const name=req.body.name;
        const link=req.body.link;
        const anh=req.file;
        const data=[];
        const img= await create.checkImg(anh,data)
        const creat= await model.create(name,link,img)
        res.redirect('/admin/soicial') 
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/soicial')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        res.render('./edit/soicial',{data:data})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name=req.body.name;
        const link=req.body.link;
        const anh=req.file;
        const data= await model.getedit(id);
        const img=await create.checkImg(anh,data)
        const crea= await model.postedit(id,name,link,img)
        res.redirect('/admin/soicial') 
    },
    soicial:async(req,res)=>{
        const data= await model.soicial();
        res.render('pageadmin/soicial',{data:data})
    },
}