const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    blog:async()=>{
        const data= await prisma.blog.findMany()
        return data;
      },
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
     getedit:async(id)=>{
      const data= await prisma.blog.findUnique({
          where:{id:id},
          select:{
             img:true,
             name:true,
             describe:true,
             content:true,
             tag:{
                 select:{
                       tag:{
                          select:{
                              id:true,
                              name:true
                          }
                       }
                 }
             },
             categori:{
              select:{
                  categori:{
                       select:{
                           id:true,
                           name:true
                          }
                      }
                  }
             },
             user:{
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

