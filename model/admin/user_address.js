const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    getaddress:async(iduser)=>{
        const address=await prisma.user_address.findMany({where:{userid:iduser,active:1}})
        return address
    }
}