const express=require('express');
const app = express();
app.set('view engine', 'ejs');
const model=require('../../model/admin/review')
module.exports={
    delete:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await model.delete(id)
        res.redirect('/admin/review')
    },
    getedit:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await model.getedit(id)
        res.render('./edit/review',{data:data})
    },
    review:async(req,res)=>{
        const now = new Date(); // Lấy thời gian hiện tại

const day = now.getDate(); // Ngày trong tháng (1 - 31)
const month = now.getMonth() + 1; // Tháng (0 - 11) nên cần +1 để có tháng đúng (1 - 12)
const year = now.getFullYear(); // Năm đầy đủ (VD: 2023)
const hours = now.getHours(); // Giờ (0 - 23)
const minutes = now.getMinutes(); // Phút (0 - 59)
const seconds = now.getSeconds(); // Giây (0 - 59)

console.log(`Ngày: ${day}`);
console.log(`Tháng: ${month}`);
console.log(`Năm: ${year}`);
console.log(`Giờ: ${hours}`);
console.log(`Phút: ${minutes}`);
console.log(`Giây: ${seconds}`);

        const data= await model.review();
        res.render('pageadmin/review',{data:data})
    },
}