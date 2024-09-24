const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    create:async(color,name)=>{
        const create= await prisma.color.create({data:{color:`${color}`,name:`${name}`}})
     },
     delete:async(id)=>{
        const del= await prisma.color.deleteMany({where:{id:id}})
    },
    getedit:async(id)=>{
        const data= await prisma.color.findUnique({where:{id:id}})
        return data;
    },
    postedit:async(id,color,name)=>{
        const update=await prisma.color.update({
            where:{id:id},
             data:{
                color:`${color}`
                ,name:`${name}`
             }
        }) 
    },
    color:async(req,res)=>{
        const data= await prisma.color.findMany()
        return data;
      }
}