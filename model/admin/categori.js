const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    create:async(name,describe,content,img,tag,categori)=>{
        var user=0;
        const cret=await prisma.blog.create({data:{
        name:name,describe:describe,img:img,content:content,userid:1
        }})
        const blog = await prisma.blog.findFirst({
           where: {
             name: name,
             content: content,
             describe:describe,
             img:img
           },
           orderBy: {
             id: 'desc',
           },
           select: {
             id: true,
           },
         });
       const blogId = blog.id;
       if(tag != undefined){
        for(var i=0; i< tag.length; i++){
           await prisma.blog_tag.create({
              data:{
                 blogid:blogId,
                 tagid:parseInt(tag[i])
              }
           });
        }
       }
       if(categori != undefined){
           for(var i=0; i< categori.length; i++){
                await prisma.blog_categori.create({
                      data:{
                        blogid:blogId,
                        categorid:parseInt(categori[i])
                           }
                 })
        }}
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
                categori:`${categori}`
             }
        }) 
    },
    categori:async(req,res)=>{
        const data= await prisma.categori.findMany()
        return data;
      }
 }