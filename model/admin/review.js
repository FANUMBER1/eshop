const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    delete:async(id)=>{
        const del= await prisma.review.deleteMany({where:{id:id}})
    },
    create:async(productid,userid,content)=>{
        const create= await prisma.review.create({data:{productid:productid,userid:userid,content:`${content}`}})
    },
    getedit:async(id)=>{
        const data= await prisma.review.findUnique({
            where:{id:id},
            select:{
                content:true,
                id:true,
                user:{
                    select:{
                        name:true,
                        id:true,
                    }
                },
                product:{
                    select:{
                        name:true,
                        id:true
                    }
                }
            }
        })
        return data;
    },
    postedit:async(id,name)=>{
        const update=await prisma.review.update({
            where:{id:id},
             data:{
                productid:productid,userid:userid,content:`${content}`             
            }
        }) 
    },
    review:async(req,res)=>{
        const data= await prisma.review.findMany({
            select:{
                id:true,
                user:{
                    select:{
                        name:true,
                        id:true,
                    }
                },
                product:{
                    select:{
                        name:true,
                        id:true
                    }
                }
            }
        })
        return data;
    }
}