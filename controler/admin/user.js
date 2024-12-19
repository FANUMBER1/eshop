const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/user')
const modelrole=require('../../model/admin/role')
const modelimg=require('../../model/admin/admin')
const modeltyper=require('../../model/admin/typeruser')
module.exports={

    user:async(req,res)=>{
        const data= await model.user();
        console.log(data[2].img[0])
        res.render('pageadmin/inforUser',{data:data})
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const role= await modelrole.role()
        const data= await model.getedit(id)
        const typer= await modeltyper.typeruser()
        res.render('edit/inforUser',{data:data,datarole:role,typer:typer})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        const anh=req.file
        const img=await modelimg.checkImg(anh,data)
        const position=parseInt(req.body.position);
        const typer=req.body.typer
        const up= await model.postedit(id,position,img,typer)
        res.redirect('/admin/inforuser')
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/inforuser')
    }
}