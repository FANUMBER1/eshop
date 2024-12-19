const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    checkbuymin:async(iduser,sum)=>{
        var data=[]
            const datal=await prisma.coupon.findMany({
            where:{
                action:1,
                typer:{none:{}},
                user:{none:{}},
            },
            include:{
                typer:true,
                classfy:true,
                product:true,    
            }

            })
            const coupon=await prisma.coupon.findMany({
                where:{
                    action:1,
                    user:{
                        some:{
                            userid:iduser
                        }
                    },
                    buymin:{
                          lt:Math.round(sum)
                    },
                    },
                    include:{
                        typer:true,
                        classfy:true,
                        product:true,    
                    }
            })
            const dat=await prisma.coupon.findMany({
                    where:{
                        action:1,
                        typer:{
                            some:{
                                typer:{
                                        user:{
                                            some:{
                                                userid:iduser
                                            }
                                        }
                                    
                                 }
                            }
                             
                        }
                    },
                    include:{
                        typer:true,
                        classfy:true,
                        product:true,
                    }
            })      
            for(var i=0; i< coupon.length;i++){
                data.push(coupon[i])
            }    
            for(var i=0; i< dat.length;i++){
                data.push(dat[i])
            }  
            for(var i=0; i< datal.length;i++){
                data.push(datal[i])
            } 
            // const checkdata=await prisma.coupon_oder.findMany({
            //     where:{
            //         userid:iduser,
            //         coupon:{
            //             some:{
            //                 active:{
            //                     not:1
            //                   }
            //             }
            //         }
                    
            //     },
                
            // })
            // for(var i=0 ; data.length; i++){
            //     var check=0
            //     for(var j=0; checkdata.length; j++){
            //         if(data[i].id== checkdata[j].couponid){
            //             check++;
            //         }
            //     }
            //     if(check >=2){
            //         data.slice(i,1)
            //     }
            // }
            return data
         },
        
}