const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    delete:async(id)=>{
        const del= await prisma.userclass.deleteMany({where:{id:id}})
    },
    create:async(name)=>{
        const create= await prisma.userclass.create({data:{name:`${name}`}})
     },
    getedit:async(id)=>{
        const data= await prisma.userclass.findUnique({where:{id:id}})
        return data;
    },
   postedit:async(id,name)=>{
        const update=await prisma.userclass.update({
            where:{id:id},
             data:{
                name:`${name}`
             }
        }) 
    },
    userclass:async(req,res)=>{
        const data= await prisma.userclass.findMany()
        return data;
      }
}