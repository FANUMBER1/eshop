const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    delete:async(id)=>{
        const del=await prisma.contact.deleteMany({where:{id:id}})
    },
    create:async(name,subject,email,phone,message)=>{
        const crea= await prisma.contact.create({
            data:{
                name:`${name}`,subject:`${subject}`,email:`${email}`,
                phone:`${phone}`,message:`${message}`
                }
        })
    },
    contact:async()=>{
        const data=await prisma.contact.findMany();
        return data
    },
    getcontact:async(id)=>{
        const data= await prisma.contact.findMany({where:{id:id}})
        return data;
    }
}    