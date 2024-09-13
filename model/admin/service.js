const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    delete:async(id)=>{
        const del= await prisma.service.deleteMany({
            where:{id:id}
        })
    },
    create:async(name,content,img)=>{
        const create= await prisma.service.create({data:{name:`${name}`,content:`${content}`,img:`${img}`}})
     },
    getedit:async(id)=>{
        const data= await prisma.service.findUnique({
            where:{id:id}
        })
        return data;
    },
    postedit:async(id,name,content,img)=>{
        const update=await prisma.service.update({
            where:{id:id},
            data:{
                name :`${name}`,content:`${content}`,img:`${img}`
            }
        })
    },
    service:async()=>{
        const data= await prisma.service.findMany()
        return data;
    }
}