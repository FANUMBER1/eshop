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
        var coupons=[] ////mảng chứa các coupon được áp dụng cho đơn hàng
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
            datacoupons = await checkcoupon.checkbuymin(iduser, sum) ////Lấy các coupon thỏa mãn điều kiện giá trị đơn hàng thấp nhất đc dùng
            /////thêm các coupon áp dụng cho tất cả sản phẩm
            for(var i=0 ;i< datacoupons.length ;i++){
                if(datacoupons[i].classfy.length == 0 && datacoupons[i].product.length == 0){
                    coupons.push(datacoupons[i])
                }
            }
            /////xóa các coupon đã được thêm vào coupons ra datacoupon
            datacoupon=datacoupons.filter(item => {
                const coupon = item.coupon;
                return !coupon || !Array.isArray(classfy) || coupon.classfy.length === 0 || 
                                 !Array.isArray(coupon.product) || coupon.product.length === 0;
              });
            /////////Thêm các coupon áp dụng cho classfy mà đơn hàng được dùng
            for (var i = 0; i < datacoupon.length; i++) {
                if(datacoupon[i].product.length > 0){
                     for(var j=0; j < datacoupon[i].product.length; j++){
                        let check2=0;
                        for(var z=0; z < data.length ;z++){
                            if(datacoupon[i].product[j].productid == data[z].product.id){
                                check2++;
                            }
                        }
                        if(check2 != 0){
                            coupons.push(datacoupon[i])
                        }
                        if(datacoupon.length == 0){
                            break;
                        }
                    }
                }
            } 
            ////Thêm các coupon áp dụng cho product và đơn hàng áp dụng được
                for (var i = 0; i < datacoupon.length; i++) {
                    if(datacoupon[i].classfy.length > 0){
                        for (var k = 0; k < datacoupon[i].classfy.length; k++) {
                            var check1=0;
                           for (var z = 0; z < data.length; z++) {
                               if (datacoupon[i].classfy[k].classfyid == data[z].product.classfyid){
                                      check1++;
                               }
                           }
                           if(check1 != 0){
                            coupons.push(datacoupon[i])
                        }
                           if(datacoupon.length == 0){
                            break;
                           }

                       }       
                    }
                    
                }
            const datas = await user.useraddress(iduser)
            const couponoder=[]
            res.render('page/checkout', {couponoder:couponoder,coupon: coupons,sum:sum,save:0, carts: carts, data: data, idoder: idoder, classfys: classfys, datas: datas, k1: '', k2: '', k3: '', k4: '', k5: '' })
        }
    },
    coupon: async (req, res) => {
        const id=parseInt(req.params.ID);
        const idcoupon = parseInt(req.body.coupon)    
        console.log(idcoupon)   
        const crea=await coupon.oderCoupon(id,idcoupon)
        res.redirect('/checkout')
    },
    checkoutcoupon: async (req, res) => {
        const iduser = parseInt(req.session.userId)
        var carts
        var idoder
        var data
        var coupons=[]
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
            ////lấy các mã giảm giá có thể áp dụng
            datacoupons = await checkcoupon.checkbuymin(iduser, sum) ////Lấy các coupon thỏa mãn điều kiện giá trị đơn hàng thấp nhất đc dùng
            /////thêm các coupon áp dụng cho tất cả sản phẩm
            for(var i=0 ;i< datacoupons.length ;i++){
                if(datacoupons[i].classfy.length == 0 && datacoupons[i].product.length == 0){
                    coupons.push(datacoupons[i])
                }
            }
            /////xóa các coupon đã được thêm vào coupons ra datacoupon
            datacoupon=datacoupons.filter(item => {
                const coupon = item.coupon;
                return !coupon || !Array.isArray(classfy) || coupon.classfy.length === 0 || 
                                 !Array.isArray(coupon.product) || coupon.product.length === 0;
              });
            /////////Thêm các coupon áp dụng cho classfy mà đơn hàng được dùng
            for (var i = 0; i < datacoupon.length; i++) {
                if(datacoupon[i].product.length > 0){
                     for(var j=0; j < datacoupon[i].product.length; j++){
                        let check2=0;
                        for(var z=0; z < data.length ;z++){
                            if(datacoupon[i].product[j].productid == data[z].product.id){
                                check2++;
                            }
                        }
                        if(check2 != 0){
                            coupons.push(datacoupon[i])
                        }
                        if(datacoupon.length == 0){
                            break;
                        }
                    }
                }
            } 
            ////Thêm các coupon áp dụng cho product và đơn hàng áp dụng được
                for (var i = 0; i < datacoupon.length; i++) {
                    if(datacoupon[i].classfy.length > 0){
                        for (var k = 0; k < datacoupon[i].classfy.length; k++) {
                            var check1=0;
                           for (var z = 0; z < data.length; z++) {
                               if (datacoupon[i].classfy[k].classfyid == data[z].product.classfyid){
                                      check1++;
                               }
                           }
                           if(check1 != 0){
                            coupons.push(datacoupon[i])
                        }
                           if(datacoupon.length == 0){
                            break;
                           }

                       }       
                    }
                    
                }
                //////
            carts = await cart.getcart(iduser)
            idoder = await oder.getoder(iduser)
            const datas = await user.useraddress(iduser)
            const couponoder=await coupon.getConponoder(idoder[0].id)
            var save=0;
            if(couponoder.length != 0){
            if(couponoder[0].coupon.classfy.length == 0 && couponoder[0].coupon.product.length == 0){
                if(parseInt(couponoder[0].coupon.discountpercent) > 0){
                    save=parseInt(couponoder[0].coupon.discountpercent)*sum/100;
                }else{
                    save=parseInt(couponoder[0].coupon.discountprice)
                }
            }
            if(couponoder[0].coupon.classfy.length > 0){
                var sumClassfy=0;
                for(var i=0; i < couponoder[0].coupon.classfy.length;i++ ){
                    for (var z = 0; z < data.length; z++) {
                        if (couponoder[0].coupon.classfy[i].classfyid == data[z].product.classfyid){
                               sumClassfy=sumClassfy + parseInt(data[z].quantity)*(parseInt(data[z].product.price)-parseInt(data[z].product.price)*parseInt(data[z].product.discount.name)/100)
                        }
                    } 
                }
                if(parseInt(couponoder[0].coupon.discountpercent) > 0){
                    save=parseInt(couponoder[0].coupon.discountpercent)*sumClassfy/100;
                }else{
                    save=parseInt(couponoder[0].coupon.discountprice)
                }
            }
            if(couponoder[0].coupon.product.length > 0){
                console.log(1)
                var sumproduct=0;
                for(var i=0; i < couponoder[0].coupon.product.length;i++ ){
                    for (var z = 0; z < data.length; z++) {
                        if (couponoder[0].coupon.product[i].productid == data[z].productid){
                               sumproduct=sumproduct + parseInt(data[z].quantity)*(parseInt(data[z].product.price)-parseInt(data[z].product.price)*parseInt(data[z].product.discount.name)/100)
                        }
                    } 
                }
                if(parseInt(couponoder[0].coupon.discountpercent) > 0){
                    save=parseInt(couponoder[0].coupon.discountpercent)*sumproduct/100;
                }else{
                    save=parseInt(couponoder[0].coupon.discountprice)
                }
            }
        }
            res.render('page/checkout', {couponoder:couponoder,sum:sum,save:save, coupon:coupons, carts: carts, data: data, idoder: idoder, classfys: classfys, datas: datas, k1: '', k2: '', k3: '', k4: '', k5: '' })
        }
    }