const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    delete:async(id)=>{
        const del= await prisma.tags.deleteMany({where:{id:id}})
    },
    create:async(name)=>{
        const create= await prisma.tags.create({data:{name:`${name}`}})
     },
     geteidt:async(id)=>{
        const data= await prisma.tags.findUnique({where:{id:id}})
        return data;
    },
    postedit:async(id,name)=>{
        const update=await prisma.tags.update({
            where:{id:id},
             data:{
                name:`${name}`
             }
        }) 
    },
    tag:async(req,res)=>{
        const data= await prisma.tags.findMany()
        return data;
  },
  checkname:async(name)=>{
    const data= await prisma.tags.findMany({where:{name:name}})
    return data
  }
}