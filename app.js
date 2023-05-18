const express = require('express')
require('dotenv').config()
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const cartRoute = require('./routes/cartRoute')
const dbconnect = require('./config/dbConnect')
const app=express()

dbconnect()
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use("/api/v1/user",userRoute)
app.use("/api/v1/product",productRoute)
app.use('/api/v1/cart',cartRoute)
app.use((err,req,res,next)=>{
    return res.status(500).json({
        success:false,
        message:"Internal server error! - "+err.message
    })
})
app.listen(process.env.PORT,()=>{
    console.log("Server Running at 4000");
})