const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/product')
const page=require('../../model/admin/page')
module.exports={
    product:async(req,res)=>{
        const data= await page.product()
        res.render('product',{data:data})
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        const datasize= await page.size();
        const datacolor= await page.color();
        const dataclassfy=await page.classfy()
        const datauserclass=await page.userclass()
        const datadiscount=await page.discount()
        res.render('./edit/product',{data:data,size:datasize,color:datacolor,classfy:dataclassfy
            ,userclass:datauserclass,discount:datadiscount})
    },
    postedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name=req.body.name;
        const price=req.body.price;
        const quantity=req.body.quantity;
        const classfy=parseInt(req.body.classfy);
        const userclass=parseInt(req.body.userclass);
        const discount=parseInt(req.body.discount);
        const describe=req.body.describe;
        const content=req.body.content;
        const size=req.body.size;
        const color=req.body.color;
        const crea=await model.postedit(id,name,price,quantity,classfy,userclass,discount,
            describe,content,size,color)
        res.redirect('/admin/product')
    },
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/product')

    }
}
