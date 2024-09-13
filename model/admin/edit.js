const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
module.exports={
    ////profile
    ,
    ////////soicial
    
    ///////contact
    contact:async(id)=>{
        const data= await prisma.contact.findUnique({where:{id:id}})
        return data;
    },
    ///////role
    
    /////////user
    
        ///////role
        
    ///////role
    
        ///////role
        ,
            ///////role
    categori:async(id)=>{
        const data= await prisma.categori.findUnique({where:{id:id}})
        return data;
    },
    editcategori:async(id,categori)=>{
        const update=await prisma.categori.update({
            where:{id:id},
             data:{
                categori:`${categori}`
             }
        }) 
    },
    /////service
    
     ///////role
     
     ///////role
     
     ///////role
     ,
    getproduct:async(id)=>{
            const data= await prisma.product.findUnique({
                where:{id:id},
              select:{
                id:true,
                name:true,
                quantity:true,
                price:true,
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
              }
            }
        })
        return data;
    },
    postproduct:async(id,name,price,quantity,classf,userclass,discount,
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
        ///////////blog
        

 
}