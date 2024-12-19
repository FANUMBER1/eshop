const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = {
  coupon: async (req, res) => {
    const data = await prisma.coupon.findMany()
    return data
  },
  creatcoupon: async (name, discountpercent, quantity, discountprice, buymin, classfy, coupo,product,discountmin,usermin) => {
    const cre = await prisma.coupon.create({
      data: {
        name: name, discountpercent: discountpercent, quantity: quantity, discountprice: discountprice,
        buymin: parseInt(buymin), coupon: coupo, action: 0,pricemin:discountmin,quantityuser:parseInt(usermin)
      }
    })
    const dataproduct=await prisma.product.findMany()
    const coupons = await prisma.coupon.findFirst({
      where: {
        name: name,
        coupon: coupo
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
      },
    });
    const couponId = coupons.id;
    if (classfy != undefined) {
      for (var i = 0; i < classfy.length; i++) {
        await prisma.coupon_classfy.create({
          data: {
            couponid: couponId,
            classfyid: parseInt(classfy[i])
          }
        });
      }
    }
    if (product != 0 && product != undefined) {
      for (var i = 0; i < product.length; i++) {
        await prisma.coupon_product.create({
          data: {
            couponid: couponId,
            productid: parseInt(product[i])
          }
        });
      }
    }
  return coupons.id
  },

  postedit:async(name,discountpercent,quantity,discountprice,buymin,classfy,coupo,product,discountmin,id,typer,user)=>{
    const cre = await prisma.coupon.update({
      where:{id:id},
      data: {
        name: name, discountpercent: discountpercent, quantity: quantity, discountprice: discountprice,
        buymin: parseInt(buymin), coupon: coupo,pricemin:discountmin
      }
    })

    const del1 = await prisma.coupon_classfy.deleteMany({ where: { couponid: id } })
    const del2 = await prisma.coupon_user.deleteMany({ where: { couponid: id } })
    const del4 = await prisma.coupon_product.deleteMany({ where: { couponid: id } })
    const del3 = await prisma.coupon_typer.deleteMany({ where: { couponid: id } })
    if (classfy != undefined) {
      for (var i = 0; i < classfy.length; i++) {
       const data= await prisma.coupon_classfy.create({
          data: {
            couponid: id,
            classfyid: parseInt(classfy[i])
          }
        });
      }
    }
    console.log('product',product)
    if (product > 0) {
     const dtaa= await prisma.coupon_product.create({
        data: {
          couponid: id,
          productid: parseInt(product)
        }
      });
    }else if( product != undefined && product !=0){
      for (var i = 0; i < product.length; i++) {
       const dataa= await prisma.coupon_product.create({
          data: {
            couponid: id,
            productid: parseInt(product[i])
          }
        });
      }
    }
    if(typer != undefined && typer!='All'){
        for (var j = 0; j < typer.length; j++) {
          const data = await prisma.coupon_typer.findMany({ where: { couponid: parseInt(id), typerid: parseInt(typer[j]) } })
          if (data.length <= 0){
            const crea = await prisma.coupon_typer.create({
              data: { couponid: parseInt(id), typerid: parseInt(typer[j])}
            })
          }
    }  
  }
  if (user.length > 0) {
      for (var j = 0; j < user.length; j++) {
        const data = await prisma.coupon_user.findMany({ where: { couponid: parseInt(id), userid: parseInt(user[j]) } })
        if (data.length <= 0){
          const crea = await prisma.coupon_user.create({
            data: { couponid: parseInt(id), userid: parseInt(user[j]) }
          })
        }
  }
}
  },
  getactive: async (id) => {
    const data = await prisma.coupon.findMany({ where: { id: id } })
    var change = 1
    if (data[0].action == 1) {
      change = 0
    }
    const updat = await prisma.coupon.updateMany({
      where: {
        id: id,
      },
      data: { action: change }
    })
  },
  getedit: async (id) => {
    const data = await prisma.coupon.findMany({
      where: { id: id },
      include: {
        classfy: {
          include: {
            classfy: true,
          }
        },
        product:{
            include:{
              product:true
            }
        },
        user:{
          include:{
              user:{

              }
          }
        },
        typer:{
          include:{
            typer:true,
          }
        }
      }
    })
    return data[0]
  },
  delete: async (id) => {
    const del1 = await prisma.coupon_classfy.deleteMany({ where: { couponid: id } })
    const del2 = await prisma.coupon_user.deleteMany({ where: { couponid: id } })
    const del4 = await prisma.coupon_product.deleteMany({ where: { couponid: id } })
    const del5 = await prisma.coupon_oder.deleteMany({ where: { couponid: id } })
    const del6 = await prisma.coupon_typer.deleteMany({ where: { couponid: id } })
    const del3 = await prisma.coupon.deleteMany({ where: { id: id } })
  },

  usercoupon: async (iduser) => {
    const data=[]
    const data3=await prisma.coupon.findMany({
      where:{
        action:1,
          typer:{none:{}},
          user:{none:{}},
      },
      include:{
          typer:true,
          classfy:true,
          product:true,    
      }

      })

    const data1 = await prisma.coupon.findMany({
      where: {
        user:{
          some:{
            userid:iduser
          }
        },
          action: 1,
      },
    })
    const data2=await prisma.coupon.findMany({
      where:{
          action:1,
          typer:{
              some:{
                  typer:{
                          user:{
                              some:{
                                  userid:iduser
                              }
                          }
                      
                   }
              }
               
          }
      },
      include:{
          typer:true,
          classfy:true,
          product:true,
      }
})      
for(var i=0; i< data1.length;i++){
  data.push(data1[i])
}  
for(var i=0; i< data2.length;i++){
  data.push(data2[i])
} 
for(var i=0; i< data3.length;i++){
  data.push(data3[i])
} 
// for(var i=0 ; data.length; i++){
//   var check=0
//   for(var j=0; checkdata.length; j++){
//       if(data[i].id== checkdata[j].couponid){
//           check++;
//       }
//   }
//   if(check >=2){
//       data.slice(i,1)
//   }
// }
return data
  },
  
  donatecoupon: async (user, coupons,typers) => {
    if (user != undefined && coupons != undefined) {
      if (coupons > 0) {
        for (var j = 0; j < user.length; j++) {
          const data = await prisma.coupon_user.findMany({ where: { couponid: parseInt(coupons), userid: parseInt(user[j]) } })
          if (data.length <= 0){
            const crea = await prisma.coupon_user.create({
              data: { couponid: parseInt(coupons), userid: parseInt(user[j]) }
            })
          }
          const coupon = await prisma.coupon.findMany({ where: { id: parseInt(coupons) } })
          const del = await prisma.coupon.update({
            where: { id: parseInt(coupons) },
            data: {
              quantity: String(parseInt(coupon[0].quantity) - 1)
            }
          })
        }
    }
  }
  if(typers != undefined && coupons != undefined && typers != 'All'){
    if (coupons > 0) {
      for (var j = 0; j < typers.length; j++) {
        const data = await prisma.coupon_typer.findMany({ where: { couponid: parseInt(coupons), typerid: parseInt(typers[j]) } })
        if (data.length <= 0){
          const crea = await prisma.coupon_typer.create({
            data: { couponid: parseInt(coupons), typerid: parseInt(typers[j])}
          })
        }
      }
  }  
}
  },
  oderCoupon: async (idoder, idcoupon) => {
    const data = await prisma.coupon_oder.findMany({
      where: {
        oder: {
          active: 0,
        },
        oderid: idoder
      }
    })
    if (data.length > 0) {
      const delet = await prisma.coupon_oder.deleteMany({
        where: { id: data[0].id }
      })
      const cre = await prisma.coupon_oder.create({
        data: { oderid: idoder, couponid: idcoupon }
      })

    } else {
      const crea = await prisma.coupon_oder.create({
        data: { oderid: idoder, couponid: idcoupon }

      })
    }
  },
  getConponoder:async(idoder)=>{
    const data=await prisma.coupon_oder.findMany({
      where:{
        oder:{
          active:0,
          id:idoder,
        },
      },
      include:{
        coupon:{
          include:{
            classfy:true,
            product:true,
          }
        }
      }
    })
    return data
  },
  
}
