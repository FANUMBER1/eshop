const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/oder')
const product=require('../../model/admin/product')
const coupon=require('../../model/admin/coupon')
module.exports={
      oder:async(req,res)=>{
        const data= await model.odered();
        const dataproduct= await product.product();
        var datasave=[]
            for(var h=0; h< data.oderids.length; h++){
              var data1=await model.checked(data.oderids[h].userid,data.oderids[h].id)
              var couponoder=await model.getConponoder(data.oderids[h].id)
              var save=0;
              if(couponoder.length != 0){
                var sum = 0
                for (var i = 0; i < data1.length; i++) {
                    sum = sum + (parseInt(data1[i].quantity) * parseInt(data1[i].product.price)
                        - parseInt(data1[i].quantity) * (parseInt(data1[i].product.price) * parseInt(data1[i].product.discount.name) / 100)
                    )
                }
              if(couponoder[0].coupon.classfy.length == 0 && couponoder[0].coupon.product.length == 0){
                  if(parseInt(couponoder[0].coupon.discountpercent) > 0){
                      datasave.push(parseInt(couponoder[0].coupon.discountpercent)*sum/100)
                  }else{
                    datasave.push(parseInt(couponoder[0].coupon.discountprice))
                  }
              }
              if(couponoder[0].coupon.classfy.length > 0){
                  var sumClassfy=0;
                  for(var i=0; i < couponoder[0].coupon.classfy.length;i++ ){
                      for (var z = 0; z < data1.length; z++) {
                          if (couponoder[0].coupon.classfy[i].classfyid == data1[z].product.classfyid){
                                 sumClassfy=sumClassfy + parseInt(data1[z].quantity)*(parseInt(data1[z].product.price)-parseInt(data1[z].product.price)*parseInt(data1[z].product.discount.name)/100)
                          }
                      } 
                  }
                  if(parseInt(couponoder[0].coupon.discountpercent) > 0){
                    datasave.push(parseInt(couponoder[0].coupon.discountpercent)*sumClassfy/100)
                  }else{
                    datasave.push(parseInt(couponoder[0].coupon.discountprice))
                  }
              }
              if(couponoder[0].coupon.product.length > 0){
                  var sumproduct=0;
                  for(var i=0; i < couponoder[0].coupon.product.length;i++ ){
                      for (var z = 0; z < data1.length; z++) {
                          if (couponoder[0].coupon.product[i].productid == data1[z].product.id){
                                 sumproduct=sumproduct + parseInt(data1[z].quantity)*(parseInt(data1[z].product.price)-parseInt(data1[z].product.price)*parseInt(data1[z].product.discount.name)/100)
                          }
                      } 
                  }
                  if(parseInt(couponoder[0].coupon.discountpercent) > 0){
                    datasave.push(parseInt(couponoder[0].coupon.discountpercent)*sumproduct/100)
                  }else{
                    datasave.push(parseInt(couponoder[0].coupon.discountprice))
                  }
              }            
            }else{
              datasave.push(0)
            }
          }
        res.render('pageadmin/oder',{data:data,product:dataproduct,datasave:datasave})
      },
      getdit:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const data= await model.odered(id);
        res.render('edit/oder',{data:data})
      },
      comfirmOder:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const up=await model.comfirmOder(id)
        res.redirect('/admin/oder')
      }
}