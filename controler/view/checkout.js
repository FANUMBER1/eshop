const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const profile = require('../../model/admin/profile')
const classfy = require('../../model/admin/classfy')
const user = require('../../model/admin/user')
const oder = require('../../model/admin/oder')
const cart = require('../../model/admin/cart')
const coupon = require('../../model/admin/coupon')
const checkcoupon = require('../../model/admin/checkout')
app.set('view engine', 'ejs');
module.exports = {
    checkout: async (req, res) => {
        const iduser = parseInt(req.session.userId)
        var carts
        var idoder
        var data
        var count
        var idproduct = []
        const quantity = []
        const classfys = await classfy.classfy()
        var coupons
        if (iduser >= 0) {
            idproduct = req.body.products
            carts = await cart.getcart(iduser)
            if (idproduct > 0) { ////kiểm tra giá trị là một số
                for (var i = 0; i < carts.length; i++) {
                    if (carts[i].product.id == idproduct) {
                        count = carts[i].quantity;
                    }
                }
                quantity.push(req.body[`quant${idproduct}`] ?? count)
            } else { //////giá trị idproduct là một chuỗi
                for (var i = 0; i < carts.length; i++) {
                    var check = 0;
                    for (var j = 0; j < idproduct.length; j++) {
                        if (idproduct[j] == carts[i].product.id) {
                            check = 1;
                        }
                    }
                    if (check == 1) {
                        count = carts[i].quantity;
                        quantity.push(req.body[`quant${carts[i].product.id}`] ?? count)
                    }
                }
            }
            ///// Tạo oder dự kiến cho user
            if (idproduct > 0) {
                const cre = await oder.create(idproduct, quantity, iduser)
                idoder = await oder.getoder(iduser)

            } else {
                if (idproduct.length > 0) {
                    const cre = await oder.create(idproduct, quantity, iduser)
                    idoder = await oder.getoder(iduser)
                }

            }
            data = await oder.checkoutOder(iduser) /// Lấy thông tin oder
            /////Tính tổng giá tiền
            var sum = 0
            for (var i = 0; i < data.length; i++) {
                sum = sum + (parseInt(data[i].quantity) * parseInt(data[i].product.price)
                    - parseInt(data[i].quantity) * (parseInt(data[i].product.price) * parseInt(data[i].product.discount.name) / 100)
                )
            }
            ////lấy các mã giảm giá có thể áp dụng
            datacoupon = await checkcoupon.checkbuymin(iduser, sum)
            for (var i = 0; i < datacoupon.length; i++) {
                var check = 0
                for (var j = 0; j < datacoupon[i].coupon.classfy.length; j++) {
                    for (var z = 0; z < data.length; z++) {
                        if (datacoupon[i].coupon.classfy[j].classfyid == data[z].product.classfyid) {

                        }
                    }
                }
            }
            const datas = await user.useraddress(iduser)
            const couponoder=[]
            res.render('page/checkout', {couponoder:couponoder,coupon: datacoupon, carts: carts, data: data, idoder: idoder, classfys: classfys, datas: datas, k1: '', k2: '', k3: '', k4: '', k5: '' })
        }
    },
    coupon: async (req, res) => {
        const id=parseInt(req.params.ID);
        const idcoupon = parseInt(req.body.coupon)       
        const crea=await coupon.oderCoupon(id,idcoupon)
        res.redirect('/checkout')
    },
    checkoutcoupon: async (req, res) => {
        const iduser = parseInt(req.session.userId)
        var carts
        var idoder
        var data
        const quantity = []
        const classfys = await classfy.classfy()
            
            data = await oder.checkoutOder(iduser) /// Lấy thông tin oder
            /////Tính tổng giá tiền
            var sum = 0
            for (var i = 0; i < data.length; i++) {
                sum = sum + (parseInt(data[i].quantity) * parseInt(data[i].product.price)
                    - parseInt(data[i].quantity) * (parseInt(data[i].product.price) * parseInt(data[i].product.discount.name) / 100)
                )
            }
            ////lấy các mã giảm giá có thể áp dụng
            datacoupon = await checkcoupon.checkbuymin(iduser, sum)
            for (var i = 0; i < datacoupon.length; i++) {
                var check = 0
                for (var j = 0; j < datacoupon[i].coupon.classfy.length; j++) {
                    for (var z = 0; z < data.length; z++) {
                        if (datacoupon[i].coupon.classfy[j].classfyid == data[z].product.classfyid) {

                        }
                    }
                }
            }
            carts = await cart.getcart(iduser)
            idoder = await oder.getoder(iduser)
            const datas = await user.useraddress(iduser)
            const couponoder=await coupon.getConponoder(idoder)
            console.log(couponoder)
            res.render('page/checkout', {couponoder:couponoder,sum:sum, coupon: datacoupon, carts: carts, data: data, idoder: idoder, classfys: classfys, datas: datas, k1: '', k2: '', k3: '', k4: '', k5: '' })
        }
    }