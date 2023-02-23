const express=require('express');
const multer = require('multer');
const path = require('path')
const { route } = require('./routes/userRoutes');
const {product} = require('./routes/productRoutes')
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended : false}))
const {errorHandler} = require('./middleware/errorMiddleware')
app.use(errorHandler)
app.use('/profile',express.static('upload/Images'))
app.use('/api/userAuth',require('./routes/userAUTHroutes'))
app.use('/api/user',require('./routes/userRoutes'));
app.use('/api/product', require('./routes/productRoutes'))
const ConnectDB = require('./config/db')
ConnectDB()


console.log(process.env.MONGO_URL);
const storage= multer.diskStorage({
    destination:"./upload/images",
    filename:(req,file,cb)=>{
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
 })
 const upload = multer({
    storage:storage
    
 })

app.post("/upload",upload.single('profile'),(req,res)=>{
console.log(req.file);
res.json({
    success:1,
    profile_url :`http://localhost:8000/profile/${req.file.filename}`

    
})
})

app.listen(port,()=>{
    console.log(`port is colled${port}`);
})



