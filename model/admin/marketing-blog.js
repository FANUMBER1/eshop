const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    
    create:async(name,link,img,active)=>{
        const crea= await prisma.marketing_blog.create({data:{
           name:`${name}`,link:`${link}`,img:`${img}`,activeid:active
        }})
    },
    getedit:async(id)=>{
        const data= await prisma.marketing_blog.findUnique({
            where:{id:id},
            select:{
                name:true,
                link:true,
                img:true,
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
    postedit:async(id,name,link,img,active)=>{
        const upda=await prisma.marketing_blog.update({
            where:{id:id},
            data:{
                name:`${name}`,link:`${link}`,img:`${img}`,active:active
            }
        })
    },
    marketing_blog:async()=>{
        const data= await prisma.marketing_blog.findMany({
            select:{
                id:true,
                name:true,
                link:true,
                img:true,
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
        const upda=await prisma.marketing_blog.update({
            where:{id:id},
            data:{
               activeid:active
            }
        })    
    },
    delete:async(id)=>{
        const dele= await prisma.marketing_blog.deleteMany({where:{id:id}})
    }
}