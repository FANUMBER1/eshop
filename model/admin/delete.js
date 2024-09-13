const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={

    ////review
    review:async(id)=>{
        const del=await prisma.review.deleteMany({where:{id:id}})
     },
    ////soicial
    ,
    ////contact
    ,
    //////role
    ,
    ////////
    user:async(id)=>{
        const del= await prisma.user.deleteMany({where:{id:id}}) 
    },
    //////role
    ,
    //////role
    
    //////role
   ,
    //////role
    categori:async(id)=>{
        const del= await prisma.categori.deleteMany({where:{id:id}})
    },
    
     //////role
    
    //////role
    ,
    //////role
   ,
    ////product
    product:async(id)=>{
        const del1= await prisma.product_size.deleteMany({
            where:{productid:id}
        })
        const del2= await prisma.product_color.deleteMany({
            where:{productid:id}
        }) 
        const del3= await prisma.product.deleteMany({
            where:{id:id}
        })    
    }
}