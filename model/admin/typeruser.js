const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    delete:async(id)=>{
        const del1= await prisma.typer_user.deleteMany({where:{typerid:id}})
        const del2= await prisma.coupon_typer.deleteMany({where:{typerid:id}})
        const del= await prisma.typer.deleteMany({where:{id:id}})
    },
    create:async(name)=>{
        const create= await prisma.typer.create({data:{name:`${name}`}})
     },
    getedit:async(id)=>{
        const data=await prisma.typer.findMany({
            where:{id:id},
            include:{
                user:true
            }})
        return data;
    },
   postedit:async(id,name,user)=>{
        const update=await prisma.typer.update({
            where:{id:id},
             data:{
                name:`${name}`
             }
        }) 
        const del=await prisma.typer_user.deleteMany({where:{typerid:id}})
        if(user > 0){
          const updat2=await prisma.typer_user.create({
            data:{
              typerid:id,
              userid:parseInt(user)
            }
          })
        }else{
          for(var i=0; i< user.length; i++){
            const updat2=await prisma.typer_user.create({
              data:{
                typerid:id,
                userid:parseInt(user[i])
              }
            })
            }
        }
        
    },
    typeruser:async(req,res)=>{
        const data= await prisma.typer.findMany()
        return data;
      },
      
      checkname:async(name)=>{
        const data= await prisma.typer.findMany({where:{name:name}})
        return data
      },
      
}