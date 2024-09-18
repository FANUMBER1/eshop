const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    delete:async(id)=>{
        const del= await prisma.comment.deleteMany({where:{id:id}})
    },
    create:async(blogid,userid,content)=>{
        const create= await prisma.comment.create({data:{blogid:blogid,userid:userid,content:`${content}`}})
    },
    getedit:async(id)=>{
        const data= await prisma.comment.findUnique({
            where:{id:id},
            select:{
                id:true,
                content:true,
                user:{
                    select:{
                        name:true,
                        id:true,
                        img:true,
                    }
                },
                blog:{
                    select:{
                        name:true,
                        id:true
                    }
                }
            }
        })
        return data;
    },
    postedit:async(id,name)=>{
        const update=await prisma.comment.update({
            where:{id:id},
             data:{
                blogid:blogid,userid:userid,content:`${content}`             
            }
        }) 
    },
    comment:async(req,res)=>{
        const data= await prisma.comment.findMany({
            select:{
                id:true,
                user:{
                    select:{
                        name:true,
                        id:true,
                    }
                },
                blog:{
                    select:{
                        name:true,
                        id:true
                    }
                }
            }
        })
        return data;
    }
}