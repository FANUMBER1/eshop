const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
module.exports={
    blog:async()=>{
        const data= await prisma.blog.findMany({
          include:{
            comment:{}
          }
        })
        return data;
      },
      create:async(name,describe,content,img,tag,categori,iduser,time)=>{
        var user=0;
        const cret=await prisma.blog.create({data:{
        name:name,describe:describe,img:img,content:content,userid:iduser,time:time
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
             id:true,
             img:true,
             name:true,
             describe:true,
             content:true,
             time:true,
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
             },
             comment:{
              select:{
                  user:{
                    select:{
                      img:true,
                      name:true
                    }
                  },
                  content:true
              }
             }
          }
      })
      return data;
  },
  postedit:async(id,name,describe,content,tag,categori,img)=>{
      const up= await prisma.blog.update({
        where:{id:id},
        data:{
          name:`${name}`,
          describe:`${describe}`,
          content:`${content}`,
          img:`${img}`
        }});
        const del1= await prisma.blog_categori.deleteMany({
          where:{blogid:id}});
        const del2= await prisma.blog_tag.deleteMany({
          where:{blogid:id}});
          
          if(tag != undefined){
            for(var i=0; i< tag.length; i++){
               await prisma.blog_tag.create({
                  data:{
                     blogid:id,
                     tagid:parseInt(tag[i])
                  }
               });
            }
           }
           if(categori != undefined){
               for(var i=0; i< categori.length; i++){
                    await prisma.blog_categori.create({
                          data:{
                            blogid:id,
                            categorid:parseInt(categori[i])
                               }
                     })
            }}
  },
  delete:async(id)=>{
    const de1= await prisma.blog_categori.deleteMany({where:{blogid:id}})
    const de2= await prisma.blog_tag.deleteMany({where:{blogid:id}})
    const de3= await prisma.blog.deleteMany({where:{id:id}})
  },
  blogcategori:async(id)=>{
    const data= await prisma.blog.findMany({
      where:{
        categori:{
          some:{
            categorid:id
          }
        }
    }
    })
    return data
  },
  blogtag:async(id)=>{
    const data= await prisma.blog.findMany({
      where:{
        tag:{
          some:{
            tagid:id
          }
        }
    }
    })
    return data
  },
  pageblog:async(page)=>{
    const data= await prisma.blog.findMany({
      skip:page,
      take:4
    })
    return data;
    }

}

