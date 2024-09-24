const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    creat_cart:async(idproduct,iduser,quantity)=>{
        const chek= await prisma.user_product.findMany({where:{userid:iduser,productid:idproduct},select:{quantity:true}})
        if(chek.length >=1){
            const upda= await prisma.user_product.updateMany({
                where:{
                    userid:iduser,productid:idproduct
                },
                data:{
                    quantity:String(parseInt(chek[0].quantity)+parseInt(quantity))
                }
            })
        }else{
            const crea= await prisma.user_product.create({
                data:{
                    userid:iduser,
                    productid:idproduct,
                    quantity:quantity,
                }
    
            })
        }
       
    },
    getcart:async(iduser)=>{
        const data= await prisma.user_product.findMany({
            where:{userid:iduser},
            select:{
                id:true,
                userid:true,
                quantity:true,
                product:{
                    select:{
                        id:true,
                        name:true,
                        price:true,
                        img:true,
                        userclass:{
                            select:{
                                name:true,
                            }
                        }
                    }
                }
            }
        })
        return data;
    },
    remove:async(iduser,idproduct)=>{
        const del= await prisma.user_product.deleteMany({
            where:{
                userid:iduser,
                productid:idproduct
            }
        })
    }
}