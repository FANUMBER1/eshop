const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    getedit:async()=>{
        const data= await prisma.profile.findUnique({where:{id:0}})
        return data;
    },
    postedit:async(name,phone,address,email,img,describe)=>{
        const updata= await prisma.profile.update({where:{id:0},
            data:{name:`${name}`,phone:`${phone}`,address:`${address}`,email:`${email}`,img:`${img}`,describe:`${describe}`}})
    },
    profile:async()=>{
        const data= await prisma.profile.findMany()
        return data;
    }
}