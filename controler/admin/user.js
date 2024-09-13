const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/user')
module.exports={

    user:async(req,res)=>{
        const data= await model.user();
        res.render('inforUser',{data:data})
    },
}