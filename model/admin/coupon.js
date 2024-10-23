const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = {
  coupon: async (req, res) => {
    const data = await prisma.coupon.findMany()
    return data
  },
  creatcoupon: async (name, discountpercent, quantity, discountprice, buymin, classfy, coupo) => {
    const cre = await prisma.coupon.create({
      data: {
        name: name, discountpercent: discountpercent, quantity: quantity, discountprice: discountprice,
        buymin: parseInt(buymin), coupon: coupo, action: 0
      }
    })
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
    const del3 = await prisma.coupon.deleteMany({ where: { id: id } })
  },
  usercoupon: async (iduser) => {
    const data = await prisma.coupon_user.findMany({
      where: {
        userid: iduser,
        coupon: {
          action: 1,
        }
      },
      include: {
        coupon: true,
      }
    })
    return data
  },
  donatecoupon: async (user, coupons) => {
    console.log(coupons)
    if (user != undefined && coupons != undefined) {
      if (coupons > 0) {
        for (var j = 0; j < user.length; j++) {
          const data = await prisma.coupon_user.findMany({ where: { couponid: parseInt(coupons), userid: parseInt(user[j]) } })
          if (data.length > 0) {
            const up = await prisma.coupon_user.update({
              where: { id: data[0].id },
              data: {
                quantity: data[0].quantity + 1
              }
            })
          } else {
            const crea = await prisma.coupon_user.create({
              data: { couponid: parseInt(coupons), userid: parseInt(user[j]), quantity: 1 }
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
      } else {
        for (var i = 0; i < coupons.length; i++) {
          for (var j = 0; j < user.length; j++) {
            const data = await prisma.coupon_user.findMany({ where: { couponid: parseInt(coupons[i]), userid: parseInt(user[j]) } })
            if (data.length > 0) {
              const up = await prisma.coupon_user.update({
                where: { id: data[0].id },
                data: {
                  quantity: data[0].quantity + 1
                }
              })
            } else {
              const crea = await prisma.coupon_user.create({
                data: { couponid: parseInt(coupons[i]), userid: parseInt(user[j]), quantity: 1 }
              })
            }
            const coupon = await prisma.coupon.findMany({ where: { id: parseInt(coupons[i]) } })
            const del = await prisma.coupon.update({
              where: { id: parseInt(coupons[i]) },
              data: {
                quantity: String(parseInt(coupon[0].quantity) - 1)
              }
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
          id:idoder[0].id,
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
  }
}
