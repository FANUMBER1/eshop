const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/profile')
const create=require('../../model/admin/admin')
module.exports={
    getedit:async(req,res)=>{
        const data= await model.getedit()
        res.render('./edit/profile',{data:data})
    },
    postedit:async(req,res)=>{
        const name=req.body.name;
        const phone=req.body.phone;
        const address=req.body.address;
        const email=req.body.gmail;
        const describe=req.body.describe;
        const anh=req.file;
        const data= await model.profile();
        const img=await create.checkImg(anh,data[0])
        const update= await model.postedit(name,phone,address,email,img,describe)
        res.redirect('/admin')
    },
    profile:async(req,res)=>{
        const data=await model.profile()
        res.render('profile',{data:data});
    }
}