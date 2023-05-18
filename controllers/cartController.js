const Cart = require("../models/Cart")

const getCartByUserId=async(req,res,next)=>{
    try {
        let cart  = await Cart.findOne({userId:req.body.userId})
        res.status(200).json({
            success:true,
            cart:cart
        })
        
    } catch (error) {
        return next(error)
    }
}
const updateCart=async(req,res,next)=>{
    try {

       await Cart.findByIdAndUpdate(req.body.cartId,{items:req.body.updatedCart.items})
      
        res.status(200).json({
            success:true,
            message:"Updated cart!"
        })
        
    } catch (error) {
        return next(error)
    }
}

module.exports = {getCartByUserId,updateCart}