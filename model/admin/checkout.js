const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    checkbuymin:async(iduser,sum)=>{
        var data=[]
            const coupon=await prisma.coupon_user.findMany({
                where:{
                    userid:iduser,
                    coupon:{
                        buymin:{
                          lt:Math.round(sum)
                        }
                    },
                },
                include:{
                    coupon:{
                        include:{
                            classfy:true,
                        }
                    },
                }
            })
            return coupon
         }
        
}