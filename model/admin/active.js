const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    create:async(name)=>{
        const create= await prisma.active.create({data:{name:`${name}`}})
     },
    delete:async(id)=>{
        const del= await prisma.active.deleteMany({where:{id:id}})
    },
    getedit:async(id)=>{
        const data= await prisma.active.findUnique({where:{id:id}})
        return data;
    },
    postedit:async(id,name)=>{
        const update=await prisma.active.update({
            where:{id:id},
             data:{
                name:`${name}`
             }
        }) 
    },
    active:async(req,res)=>{
        const data= await prisma.active.findMany()
        return data;
      }
}