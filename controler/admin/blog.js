const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/blog')
module.exports={
     /////blog
     blog:async(req,res)=>{
        const data= await model.blog();
        res.render('blog',{data})
    }

}