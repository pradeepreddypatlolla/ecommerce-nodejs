const path = require('path')
const Product = require('../models/Product')

const addProduct=async(req,res)=>{

    try {
        const {name,description,price,quantity,category,sizes,images}= req.body
        const product = await Product.create({
           
            name:name,
            description:description,
            quantity:quantity,
            price:price,
            category:category,
            images:images,
            sizes:sizes,
            
        })
        res.status(201).json(product)
    } catch (error) {
        return next(error)
    }
   


    
}
const getAllProducts = async (req,res)=>{
    try {
        let products =  await Product.find()

        return res.status(200).json({
            success:true,
            products:products
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const deleteProductById = async (req,res,next)=>{
    try {
        await Product.findByIdAndDelete(req.body.id)
        res.status(200).json({
            success:true,
            message:"Deleted Successfully!"
        })
        
    } catch (error) {
           return next(error)
    }
}
const updateProductById = async (req,res,next)=>{
    try {
         await Product.findByIdAndUpdate(req.body.id,req.body.product)
        res.status(200).json({
            success:true,
            message:"Product updated"
        })
        
    } catch (error) {
        return next(error)
    }
}

const getProductById = async (req,res,next)=>{
    try {
         let product = await Product.findById(req.body.id)
         res.status(200).json({
            success:true,
            product
         })

    } catch (error) {
        return next(error)
    }
}
const getProductByCategory = async(req,res,next)=>{
    try {
        let products = await Product.find({category:req.body.category})
        res.status(200).json({
            success:true,
            products:products
        })
    } catch (error) {
        return next(error)
    }
}
const uploadImage = async (req,res)=>{
    try {
       
      // console.log(path.join(__dirname,'../images/p'))
        return res.status(200).json({path:req.file.path})
    } catch (error) {
        return res.json({message:"error -"+error.message})
    }
    
}

const addUserRating = async(req,res,next)=>{
    try {
        
        let {productId,userId,rating,review} = req.body

        let product = await Product.findById(productId)
        let userRatings = [...product.userRatings]
        userRatings.push({userId:userId,rating:rating,review:review})
        product.userRatings = userRatings
        product.totalRating = product.totalRating + rating
        await product.save()
        res.status(200).json({
            success:true,
            message:"Rating added successfully"
        })

    } catch (error) {
       return next(error)
    }
}


module.exports = {addProduct,uploadImage,getAllProducts,getProductByCategory,getProductById,updateProductById,deleteProductById,addUserRating}