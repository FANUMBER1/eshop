const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    delete:async(id)=>{
        const del= await prisma.size.deleteMany({where:{id:id}})
    },
    create:async(size)=>{
        const create= await prisma.size.create({data:{size:`${size}`}})
    },
    getedit:async(id)=>{
        const data= await prisma.size.findUnique({where:{id:id}})
        return data;
    },
    postedit:async(id,size)=>{
        const update=await prisma.size.update({
            where:{id:id},
             data:{
                size:`${size}`
             }
        }) 
    },
    size:async(req,res)=>{
        const data= await prisma.size.findMany()
        return data;
    }
}