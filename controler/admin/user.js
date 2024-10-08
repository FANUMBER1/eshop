const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/user')
const modelrole=require('../../model/admin/role')
const modelimg=require('../../model/admin/admin')
module.exports={

    user:async(req,res)=>{
        const data= await model.user();
        res.render('pageadmin/inforUser',{data:data})
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        console.log(id)
        const role= await modelrole.role()
        const data= await model.getedit(id)
        res.render('edit/inforUser',{data:data,datarole:role})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        const anh=req.file
        const img=await modelimg.checkImg(anh,data)
        const position=parseInt(req.body.position);
        const up= await model.postedit(id,position,img)
        res.redirect('/admin/inforuser')
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/inforuser')
    }
}