const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const body=require('body-parser')
const port = 2222;
const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
var cookieParser = require('cookie-parser');
const session = require('express-session');
const viewRouter=require('./router/view')
const adminRouter=require('./router/admin')
//router
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, './assets/upload/');
   },
   filename: function (req, file, cb) {
     cb(null, Date.now() + '-' + file.originalname);
   }
 });
const upload = multer({ storage: storage }); 
app.set('view engine', 'ejs');
//use
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(body.json());
app.use(body.urlencoded({ extended: true }));

///////Cấu hình express-session
app.use(cookieParser());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));
///ROUTER
app.use('/',viewRouter)
app.use('/admin',adminRouter)
// ,middlewea.requireLogin,middlewea.checkAdmin
///////////
app.listen(port,()=> {
    console.log(`Server is running on http://localhost:${port}`);
});
   


