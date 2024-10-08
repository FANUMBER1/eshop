const express=require('express');
const app = express();
const bcrypt = require('bcrypt');
const profile=require('../../model/admin/profile')
const classfy=require('../../model/admin/classfy')
const user=require('../../model/admin/user')
const oder=require('../../model/admin/oder')
const cart=require('../../model/admin/cart')
app.set('view engine', 'ejs');
module.exports={
    checkout:async(req,res)=>{
        const iduser=parseInt(req.session.userId)
        var carts
        var idoder
        var data
        var count
        var idproduct=[]
            idproduct=req.body.products
        const quantity=[]
        if(iduser>=0){
            carts= await cart.getcart(iduser)
                if(idproduct > 0){
                    for(var i=0; i< carts.length; i++){
                       if(carts[i].product.id == idproduct){
                        count=carts[i].quantity;
                       } 
                    }
                    quantity.push(req.body[`quant${idproduct}`] ?? count)    
                }else{
                    for(var i=0; i < carts.length;i++){
                        var check=0;
                    for(var j=0; j< idproduct.length; j++){
                        if(idproduct[j]==carts[i].product.id){
                          check=1;
                        }
                    }
                    if(check==1){
                        count=carts[i].quantity;
                        quantity.push(req.body[`quant${carts[i].product.id}`] ?? count)    
                        }
                    }
            }
            if(idproduct > 0){
                const cre= await oder.create(idproduct,quantity,iduser)
                idoder= await oder.getoder(iduser)
            
            }else{
                if(idproduct.length >0){
                    const cre= await oder.create(idproduct,quantity,iduser)
                    idoder= await oder.getoder(iduser)
                }
            
            }
            data=await oder.checkoutOder(iduser)
        }       
        const classfys=await classfy.classfy()
        const datas= await user.useraddress(iduser)
        res.render('page/checkout',{carts:carts,data:data,idoder:idoder,classfys:classfys,datas:datas})
    },
}