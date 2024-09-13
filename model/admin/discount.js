const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    delete:async(id)=>{
        const del= await prisma.discount.deleteMany({where:{id:id}})
    },
    create:async(name)=>{
        const create= await prisma.discount.create({data:{name:`${name}`}})
    },
    getedit:async(id)=>{
        const data= await prisma.discount.findUnique({where:{id:id}})
        return data;
    },
    postedit:async(id,name)=>{
        const update=await prisma.discount.update({
            where:{id:id},
             data:{
                name:`${name}`
             }
        }) 
    },
    discount:async(req,res)=>{
        const data= await prisma.discount.findMany()
        return data;
    }
}