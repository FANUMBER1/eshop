const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/comment')

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
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/comment')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        res.render('./edit/comment',{data:data})
    },
    comment:async(req,res)=>{
        const data= await model.comment();
        res.render('pageadmin/comment',{data:data})
    },
}