const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    
    create:async(name,link,img,namesale,discount,active)=>{
        const crea= await prisma.marketing_sale.create({data:{
           name:`${name}`,link:`${link}`,img:`${img}`,namesale:`${namesale}`,
           discountid:discount,activeid:active
        }})
    },
    getedit:async(id)=>{
        const data= await prisma.marketing_sale.findUnique({
            where:{id:id},
            select:{
                id:true,
                name:true,
                link:true,
                img:true,
                namesale:true,
                discount:{
                    select:{
                        name:true,
                        id:true,
                    }
                },
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
    postedit:async(id,name,link,img,namesale,discount,active)=>{
        const upda=await prisma.marketing_sale.update({
            where:{id:id},
            data:{
                name:`${name}`,link:`${link}`,img:`${img}`,namesale:`${namesale}`,
                discountid:discount,activeid:active
            }
        })
    },
    marketing_sale:async()=>{
        const data= await prisma.marketing_sale.findMany({
            select:{
                id:true,
                name:true,
                link:true,
                img:true,
                namesale:true,
                discount:{
                    select:{
                        name:true,
                        id:true,
                    }
                },
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
        const upda=await prisma.marketing_sale.update({
            where:{id:id},
            data:{
               activeid:active
            }
        })    
    },
    delete:async(id)=>{
        const dele= await prisma.marketing_sale.deleteMany({where:{id:id}})
    }
}