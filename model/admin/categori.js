const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    create:async(name)=>{
        const cret=await prisma.categori.create({data:{
        name:name
        }})
       
     },
     delete:async(id)=>{
        const del= await prisma.categori.deleteMany({where:{id:id}})
    },
    getedit:async(id)=>{
        const data= await prisma.categori.findUnique({where:{id:id}})
        return data;
    },
    postedit:async(id,categori)=>{
        const update=await prisma.categori.update({
            where:{id:id},
             data:{
                name:`${categori}`
             }
        }) 
    },
    categori:async(req,res)=>{
        const data= await prisma.categori.findMany()
        return data;
      },
      checkname:async(name)=>{
        const data= await prisma.categori.findMany({
            where:{name:name}
        })
        return data
      }
 }