const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    /////product
product:async(req,res)=>{
    const data= await prisma.product.findMany({
      select:{
        id:true,
        img:true,
        name:true,
        quantity:true,
        price:true,
        classfy:{
          select:{
             id:true,
             name:true
          }
        },
        userclass:{
          select:{
             id:true,
             name:true
          }
        },
        discount:{
          select:{
             id:true,
             name:true
          }
        }
      }
    })
    return data;
  },
  getedit:async(id)=>{
    const data= await prisma.product.findUnique({
        where:{id:id},
      select:{
        id:true,
        name:true,
        quantity:true,
        price:true,
        img:true,
        describe:true,
        content:true,
        countsale:true,
        countview:true,
        classfy:{
          select:{
             id:true,
             name:true
          }
        },
        userclass:{
          select:{
             id:true,
             name:true
          }
        },
        discount:{
          select:{
             id:true,
             name:true
          }
        },
      color:{
        select:{
            color:{
                select:{
                    id:true,
                    color:true,
                }
            }
        }
      },
      size:{
        select:{
            size:{
                select:{
                    id:true,
                    size:true,
                }
            }
        }
      },
      review:{
        select:{
          content:true,
          user:{
            select:{
              img:true,
              id:true,
              name:true
            }
          }
        }
      }
    }
})
return data;
},
postedit:async(id,name,price,quantity,classf,userclass,discount,
    describe,content,size,color)=>{
        const data= await prisma.product.update({
            where:{id:id},
            data:{
            name:`${name}`,price:`${price}`,quantity:`${quantity}`,classfy:{connect:{id:classf}}
            ,userclass:{connect:{id:userclass}},discount:{connect:{id:discount}},describe:`${describe}`
            ,content:`${content}`
            }
        });
        const del1= await prisma.product_size.deleteMany({
            where:{productid:id}
        })
        const del2= await prisma.product_color.deleteMany({
            where:{productid:id}
        })
        if(size != undefined){
            for(var i=0; i< size.length; i++){
               await prisma.product_size.create({
                  data:{
                     productid:id,
                     sizeid:parseInt(size[i])
                  }
               });
            }
           }
           if(color != undefined){
               for(var i=0; i< color.length; i++){
                    await prisma.product_color.create({
                          data:{
                            productid:id,
                            colorid:parseInt(color[i])
                               }
                     })
            }}
    },
    reduce:async(id)=>{
      const data= await prisma.product.findUnique({
        where:{id:id},
        select:{
          countsale:true,
          countview:true,
        }
      });
      const updat= await prisma.product.update({
        where:{id:id},
        data:{
          countsale:0,countview:data.countview - 1,
        }
    });
    },
    increase:async(id)=>{
      const data= await prisma.product.findUnique({
        where:{id:id},
        select:{
          countsale:true,
          countview:true,
        }
      });
      const updat= await prisma.product.update({
        where:{id:id},
        data:{
        countview:data.countview + 1,
        }
    });
    },
    
    ////product
    delete:async(id)=>{
        const del1= await prisma.product_size.deleteMany({
            where:{productid:id}
        })
        const del2= await prisma.product_color.deleteMany({
            where:{productid:id}
        }) 
        const del3= await prisma.product.deleteMany({
            where:{id:id}
        })    
    },
    createproduct:async(name,price,quantity,classfy,userclass,discount,
        describe,content,size,color,img)=>{
        const cret=await prisma.product.create({data:{
        name:name, price:price,quantity:quantity,classfy:{connect:{id:classfy}},
        userclass:{connect:{id:userclass}},discount:{connect:{id:discount}},
        describe:describe,content:content,countsale:0,countview:0,img:{set:img}
        }})
        const product = await prisma.product.findFirst({
           where: {
             name: name,
             content: content,
             price: price,
             quantity:quantity,
           },
           orderBy: {
             id: 'desc',
           },
           select: {
             id: true,
           },
         });
       const productId = product.id;
       if(size != undefined){
        for(var i=0; i< size.length; i++){
           await prisma.product_size.create({
              data:{
                 productid:productId,
                 sizeid:parseInt(size[i])
              }
           });
        }
       }
       if(color != undefined){
           for(var i=0; i< color.length; i++){
                await prisma.product_color.create({
                      data:{
                        productid:productId,
                        colorid:parseInt(color[i])
                           }
                 })
        }}
     },
     topview:async()=>{
        const data= await prisma.product.findMany({
          orderBy:{
            countview:'desc'
          },
          take:3
        })
        return data
     },
     topsale:async()=>{
      const data= await prisma.product.findMany({
        orderBy:{
          countsale:'desc'
        },
        take:3
      })
      return data
     },
     topdiscount:async()=>{
     },
     incresale:async(id)=>{
      const data=await prisma.oder_product.findMany({where:{
        oderid:id
      },
    include:{
      product:{}
    }
  });
    for(var i=0; i< data.length; i++){
      const updat= await prisma.product.update({
        where:{id:data[i].productid},
        data:{
        countsale:data[i].product.countsale + 1,
        quantity:String(parseInt(data[i].product.quantity) - parseInt(data[i].quantity)) 
        }
    });    
  }
  },
  pageproduct:async(page)=>{
    const data= await prisma.product.findMany({
      skip:page,
      take:9,
      select:{
        id:true,
        img:true,
        name:true,
        quantity:true,
        price:true,
        classfy:{
          select:{
             id:true,
             name:true
          }
        },
        userclass:{
          select:{
             id:true,
             name:true
          }
        },
        discount:{
          select:{
             id:true,
             name:true
          }
        }
      }
    })
    return data;
    }
    
}