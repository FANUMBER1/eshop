const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    create:async(name,email,pass,img,firstname,lastname,phone,country,state,
      address1,address2,code,company,roleid)=>{
      const cree= await prisma.user.create({data:{name:`${name}`,email:`${email}`,pass:`${pass}`,roleid:roleid,
       img:`${img}`, firstname:`${firstname}`, lastname:`${lastname}`, phone:`${phone}`, country:`${country}`, state:`${state}`, 
       address1:`${address1}`,address2:`${address2}`, code:`${code}`, company:`${company}`}})
     } ,
    getedit:async(id)=>{
        const data = await prisma.user.findUnique({
            where: {
              id: id,  
            },
            select: {
              id: true,
              name: true,
              img: true,
              email: true,
              pass: true,
              address1:true,
              phone:true,
              role: {
                select: {
                  position: true, 
                },
              },
            },
          });
        return data;
    },
    postedit:async(id,role,img)=>{
        const creat= await prisma.user.update({
            where:{id:id},
            data:{
                img:`${img}`,roleid:role
            }
        })

    },
    changeAccount:async(id,name,phone,address1,email)=>{
        const change=await prisma.user.update({
          where:{id:id},
          data:{
            name:name,
            phone:phone,
            email:email,
            address1:address1
          }
        })
    },
    user:async()=>{
        const data = await prisma.user.findMany({
            select: {
              id: true,
              name: true,
              img: true,
              email: true,
              pass: true,
              role: {
                select: {
                  position: true,  
                },
              },
            },
          });     
         return data;
    },
    delete:async(id)=>{
      const del1= await prisma.user_product.deleteMany({where:{userid:id}})
      const del= await prisma.user.deleteMany({where:{id:id}})
    },
    likeProduct:async(iduser,idproduct)=>{
      const data=await prisma.like_product.findMany({where:{userid:iduser,productid:idproduct}})
      if(data <=0 ){
        const crea=await prisma.like_product.create({
          data:{
           userid:iduser,
           productid:idproduct
          }
        })      }
      
    },
    getLikeProduct:async(id)=>{
      const data=await prisma.like_product.findMany({
        where:{userid:id},
        include:{
           product:{}
        }
      })
      return data
    },
    deleteLikeProduct:async(iduser,idproduct)=>{
      const crea=await prisma.like_product.deleteMany({
        where:{
         userid:iduser,
         productid:idproduct
        }
      })
    },
    useraddress:async(id)=>{
      const data= await prisma.user_address.findMany({
        where:{userid:id}
      })
      return data
    },
    createAddress:async(name,phone,address,id)=>{
      const data= await prisma.user_address.findMany({where:{userid:id}})
      if(data.length == 0){
        const crate=await prisma.user_address.create({
          data:{
            name:name,
            userid:id,
            phone:phone,
            address:address,
            active:1
          }
        })
      }else{
        const crate=await prisma.user_address.create({
          data:{
            name:name,
            userid:id,
            phone:phone,
            address:address,
            active:0
          }
        })
      }
      
    },
    saveAddress:async(iduser,address)=>{
      const up=await prisma.user_address.updateMany({
        where:{
          userid:iduser,  
          active:1
        },
        data:{
          active:0
        }
      })
      const up2= await prisma.user_address.update({
        where:{id:address},
        data:{
          active:1
        }
      })
   },
   deleteAddress:async(id)=>{
    const del= await prisma.user_address.deleteMany({where:{id:id}})
   },
   address:async(idaddress,iduser)=>{
    const data= await prisma.user_address.findMany({where:{userid:iduser,id:idaddress}})
    return data
   }
}