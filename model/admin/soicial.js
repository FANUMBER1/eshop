const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    delete:async(id)=>{
        const del=await prisma.soicial.deleteMany({where:{id:id}})
    },
    create:async(name,link,img)=>{
        const create= await prisma.soicial.create({data:{name:`${name}`,link:`${link}`,img:`${img}`}})
    },
    getedit:async(id)=>{
        const data= await prisma.soicial.findUnique({where:{id:id}})
        return data;
    },
    postedit:async(id,name,link,img)=>{
        const update=await prisma.soicial.update({
            where:{id:id},
            data:{
                name :`${name}`,link:`${link}`,img:`${img}`
            }
        })
    },
    soicial:async()=>{
        const data= await prisma.soicial.findMany()
        return data;
    }
}