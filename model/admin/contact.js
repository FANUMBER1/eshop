const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    delete:async(id)=>{
        const del=await prisma.contact.deleteMany({where:{id:id}})
    }
}