const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    delete:async(id)=>{
        const del= await prisma.role.deleteMany({where:{id:id}})
    },
    create:async(position)=>{
        const create= await prisma.role.create({data:{position:`${position}`}})
    },
    getedit:async(id)=>{
        const data= await prisma.role.findUnique({where:{id:id}})
        return data;
    },
    postedit:async(id,position,)=>{
        const update=await prisma.role.update({
            where:{id:id},
             data:{
                position:`${position}`
             }
        }) 
    },
    role:async(req,res)=>{
        const data= await prisma.role.findMany()
        return data;
    }
}