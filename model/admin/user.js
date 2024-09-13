const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    create:async(name,email,pass,img,firstname,lastname,phone,country,state,
      address1,address2,code,company,roleid)=>{
      const create= await prisma.user.create({data:{name:`${name}`,email:`${email}`,pass:`${pass}`,roleid:roleid,
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
              avata: true,
              email: true,
              pass: true,
              roles: {
                select: {
                  position: true, 
                },
              },
            },
          });
          
        return data;
    },
    postedit:async(id,name,taikhoan,pass,img,role)=>{
        const creat= await prisma.user.update({
            where:{id:id},
            data:{
                name:`${name}`,email:`${taikhoan}`,avata:`${img}`, pass:`${pass}`,roleid:role
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
    }
}