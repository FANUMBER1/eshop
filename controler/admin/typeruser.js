const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/typeruser')
const users=require('../../model/admin/user')
module.exports={
    create:async(req,res)=>{
        const name=req.body.name;
        const create= await model.create(name)
        res.redirect('/admin/typeruser') 
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/typeruser')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        const user=await users.user()
        res.render('./edit/typeruser',{data:data[0],user:user})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name=req.body.name;
        const user=req.body.user
        const create= await model.postedit(id,name,user)
        res.redirect('/admin/typeruser') 

    },
    typeruser:async(req,res)=>{
        const data= await model.typeruser();
        var faless
        res.render('pageadmin/typeruser',{data:data,errorMessage:faless})
    },
}