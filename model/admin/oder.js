const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    create:async(carts,quantity,iduser)=>{
        const oder = await prisma.oder.findMany({/////lấy dữ liệu id oder chưa xác nhận mua hàng và chưa oder
            where: {
                userid: iduser,
                active: 0,
            },
            select:{
                id:true,
            }
        });
        ////kiểm tra nếu chưa có oder 
        if(oder.length <= 0){
        const cre1=await prisma.oder.create({data:{userid:iduser,active: 0}})
        const oderid = await prisma.oder.findMany({
            where: {
                userid: iduser,
                active: 0,
                product: {
                    none: {}, 
                },
            },
            select:{
                id:true,
            }
        });
        for(var i=0; i < carts.length; i++){
            const crea=await prisma.oder_product.create({data:{
                oderid:oderid[0].id,
                productid:carts[i].product.id,
                quantity:`${quantity[i]}`,
            }})
        }
        }else{
            const dele= await prisma.oder_product.deleteMany({where:{oderid:oder[0].id}})
            for(var i=0; i < carts.length; i++){
                const crea=await prisma.oder_product.create({data:{
                    oderid:oder[0].id,
                    productid:carts[i].product.id,
                    quantity:`${quantity[i]}`,
                }})
            }
        }
        
        
        
    },
    getoder:async(iduser)=>{
        const data= await prisma.oder.findMany({
            where:{userid:iduser,active:0}

           })
        return data;
    },
    oder:async(iduser,idoder)=>{
        const up=await prisma.oder.updateMany({
            where:{userid:iduser,active:0,id:idoder},
            data:{
                active:1,
            }
        });
        const productoder=await prisma.oder_product.findMany({
          where:{oderid:idoder}
        })
        for(var i=0; i< productoder.length; i++){
          const del= await prisma.user_product.deleteMany({
            where:{
              userid:iduser,
              productid:productoder[i].productid
            }
          })
        }
    },
    odered:async(idoder)=>{
        var data
        const user=[]
        const product=[]
        var oderids=0
        if(idoder !== undefined){
              oderids=await prisma.oder.findMany({
                where:{id:idoder,active:1}})
                      data=await prisma.oder_product.findMany({
                        where:{oderid:oderids[0].id},
                        include: {
                            product: {
                            },
                            oder: {
                              include: {
                                user: true, 
                              }
                            }
                          }
                    })
                
        }else{
            oderids=await prisma.oder.findMany({
                where:{active:1}})
        }    
            
        for(var i=0; i< oderids.length;i++){
           const user1 = await prisma.user.findMany({
                where: {
                  oder: {
                    some: {
                      id: oderids[i].id,  
                    }
                  }
                },
                include: {
                  oder: true  
                }
              })
              user.push(user1[0])
              
        }
            const data1 = await prisma.oder_product.findMany({
                include: {
                  product: {
                  },
                  oder: {
                    include: {
                      user: true, 
                    }
                  }
                }
              });
            return {data1,user,oderids,data}
    },
    useroder:async(iduser)=>{
      const data= await prisma.oder_product.findMany({
        where: {
          oder: {
            userid: iduser,  // Điều kiện theo userid
            active:1,        // Trạng thái đơn hàng đã được gửi 
          }
        },
        include: {
          oder: true,  // Lấy thông tin của bảng 'oder'
          product: true  // Lấy thông tin của bảng 'product'
        }
      });
      return data
    }

}