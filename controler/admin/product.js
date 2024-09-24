const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/product')
const adminModel=require('../../model/admin/admin')
const profile=require('../../model/admin/profile')
const blog=require('../../model/admin/blog')
const categori=require('../../model/admin/categori')
const classfy=require('../../model/admin/classfy')
const color=require('../../model/admin/color')
const contact=require('../../model/admin/contact')
const discount=require('../../model/admin/discount')
const role=require('../../model/admin/role')
const service=require('../../model/admin/service')
const size=require('../../model/admin/size')
const soicial=require('../../model/admin/soicial')
const tag=require('../../model/admin/tag')
const user=require('../../model/admin/user')
const userclass=require('../../model/admin/userclass')
const product=require('../../model/admin/product')
module.exports={
    create:async(req,res)=>{
        const name=req.body.name;
        const price=req.body.price;
        const quantity=req.body.quantity;
        const classfy=parseInt(req.body.classfy);
        const userclass=parseInt(req.body.userclass);
        const discount=parseInt(req.body.discount);
        const describe=req.body.describe;
        const content=req.body.content;
        const data=[]
        const anh=req.files;
        const img=[]
        for(var i=0; i< anh.length ; i++){
            img.push(await adminModel.checkImg(anh[i],data))
        }
        const size=req.body.size;
        const color=req.body.color;
        const crea=await product.createproduct(name,price,quantity,classfy,userclass,discount,
            describe,content,size,color,img);
        res.redirect('/admin/product')
    },
    product:async(req,res)=>{
        const data= await model.product()
        res.render('product',{data:data})
    },
    getcreate:async(req,res)=>{
        const datasize= await size.size();
        const datacolor= await color.color();
        const dataclassfy=await classfy.classfy()
        const datauserclass=await userclass.userclass()
        const datadiscount=await discount.discount()
        res.render('create/product',{size:datasize,color:datacolor,classfy:dataclassfy
            ,userclass:datauserclass,discount:datadiscount})
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        const datasize= await size.size();
        const datacolor= await color.color();
        const dataclassfy=await classfy.classfy()
        const datauserclass=await userclass.userclass()
        const datadiscount=await discount.discount()
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
