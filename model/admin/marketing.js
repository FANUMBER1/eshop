const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    
    create:async(name,link,img,namesale,active,describe)=>{
        const crea= await prisma.marketing.create({data:{
           name:`${name}`,link:`${link}`,img:`${img}`,nameshop:`${namesale}`,
           activeid:active,describe:`${describe}`
        }})
    },
    getedit:async(id)=>{
        const data= await prisma.marketing.findUnique({
            where:{id:id},
            select:{
                id:true,
                name:true,
                link:true,
                img:true,
                nameshop:true,
                active:{
                    select:{
                        name:true,
                        id:true,
                    }
                },
            }
        })
        return data;
    },
    postedit:async(id,name,link,img,namesale,active,describe)=>{
        const upda=await prisma.marketing.update({
            where:{id:id},
            data:{
                name:`${name}`,link:`${link}`,img:`${img}`,nameshop:`${namesale}`,activeid:active,describe:`${describe}`
            }
        })
    },
    marketing:async()=>{
        const data= await prisma.marketing.findMany({
            select:{
                id:true,
                name:true,
                link:true,
                img:true,
                nameshop:true,
                describe:true,
                active:{
                    select:{
                        name:true,
                        id:true,
                    }
                },
            }
        })
        return data;    
    },
    updateactive:async(id,active)=>{
        const upda=await prisma.marketing.update({
            where:{id:id},
            data:{
               activeid:active
            }
        })    
    },
    delete:async(id)=>{
        const dele= await prisma.marketing.deleteMany({where:{id:id}})
    }
}