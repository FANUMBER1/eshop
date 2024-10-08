const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    create:async(name)=>{
        const create= await prisma.classfy.create({data:{name:`${name}`}})
     },
    delete:async(id)=>{
        const del= await prisma.classfy.deleteMany({where:{id:id}})
    },
    getedit:async(id)=>{
        const data= await prisma.classfy.findUnique({where:{id:id}})
        return data;
    },
    postedit:async(id,name)=>{
        const update=await prisma.classfy.update({
            where:{id:id},
             data:{
                name:`${name}`
             }
        }) 
    },
    classfy:async(req,res)=>{
        const data= await prisma.classfy.findMany()
        return data;
      },
      checkclassfy:async(name)=>{
        const data= await prisma.classfy.findMany({where:{name:name}})
        return data
      }
}