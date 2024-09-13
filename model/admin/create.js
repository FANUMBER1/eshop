const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
module.exports={
 ///////checkimg
 checkImg:async(anh,data)=>{
     var img='';
     if(anh==undefined){
        if(data.img!= undefined){
            img= data.img
        }else{
            img='/assets/images/anhdaidien.jpg'
        }
     }else{
        img= '/assets/upload/'+anh.filename
     }
     return img;
 },
//////soicial

/////role
,
//////user
,
/////role
,
/////role

/////role
,
/////role
createcategori:async(name)=>{
   const create= await prisma.categori.create({data:{name:`${name}`}})
},
/////service
,
/////role

/////role
creatediscount:async(name)=>{
   const create= await prisma.discount.create({data:{name:`${name}`}})
},
/////role
,
createproduct:async(name,price,quantity,classfy,userclass,discount,
   describe,content,size,color)=>{
   const cret=await prisma.product.create({data:{
   name:name, price:price,quantity:quantity,classfy:{connect:{id:classfy}},
   userclass:{connect:{id:userclass}},discount:{connect:{id:discount}},
   describe:describe,content:content,countsale:"0",countview:"0"
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


}