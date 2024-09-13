const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    ////profile
    ,
    //////soicial
    ,
    //////contact
    contact:async()=>{
        const data= await prisma.contact.findMany()
        return data;
    },
    /////role
    ,
    //////user
    ,
/////role
,
  /////role
 ,
/////role
color:async(req,res)=>{
  const data= await prisma.color.findMany()
  return data;
},
/////role
categori:async(req,res)=>{
  const data= await prisma.categori.findMany()
  return data;
},
/////service
,
/////role
categori:async(req,res)=>{
  const data= await prisma.categori.findMany()
  return data;
},
/////role
,
/////role
,
/////role
classfy:async(req,res)=>{
  const data= await prisma.classfy.findMany()
  return data;
},
/////product
product:async(req,res)=>{
  const data= await prisma.product.findMany({
    select:{
      id:true,
      name:true,
      quantity:true,
      price:true,
      classfy:{
        select:{
           id:true,
           name:true
        }
      },
      userclass:{
        select:{
           id:true,
           name:true
        }
      },
      discount:{
        select:{
           id:true,
           name:true
        }
      }
    }
  })
  return data;
},
////blog
blog:async()=>{
  const data= await prisma.blog.findMany()
  return data;
}
}