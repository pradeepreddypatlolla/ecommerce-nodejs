const Cart = require('../models/Cart')
const User = require('../models/User')
const Address = require('../models/Address')
const userRegisterController=async (req,res)=>{

    try {
        let {firstName,lastName,emailId,password,phone} = req.body
       // console.log(firstName,lastName,emailId,password,phone);
        let user = await User.findOne({emailId:emailId})
        if(user){
            res.status(403).json({
                success:false,
                message:"User already exists!"
            })
        }
        else{
            user = await User.create({
                firstName:firstName,
                lastName:lastName,
                emailId:emailId,
                password:password,
                phone:phone,
                wishlist:[]
            })
            await Cart.create({
                userId:user._id,
                items:[]
            })
            const token = await user.generateToken(user._id,{expiresIn:'1h'})
           // console.log(token);
            res.status(201).json({
                success:true,
                user,
                token:token
            })
        }
        
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error!"
        })
    }

   
}
const userLoginController=async(req,res)=>{
    try {
        
    
    let {emailId,password} = req.body
    let user = await User.findOne({emailId:emailId});
    if(!user){
       return res.status(404).json({
            success:false,
            message:"User not found!"
        })
    }

    else {
        let isValidated = await user.validatePassword(password)
        if(isValidated){
            const token = await user.generateToken(user.id,{expiresIn:"1hr"})
          //  console.log(token);
            return res.status(200).json({
                success:true,
                user,
                token
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Incorrect password!"
            })
        }
    }
} catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error - "+ error.message
        })
}

}

const addAddress = async (req,res,next)=>{
    try {
        let {userId,address,city,state,pincode,country} = req.body
        let newAddress = await Address.create({
            userId:userId,
            address:address,
            city:city,
            state:state,
            pincode:pincode,
            country:country
        })
        res.status(201).json({
            success:true,
            message:"Address added"
        })
        
    } catch (error) {
        return next(error)
    }
}

const getAllAddressById = async(req,res,next)=>{
    try {
        let addresses = await Address.find({userId:req.body.userId}) 
        res.status(200).json({
            success:true,
            addresses:addresses
        })
    } catch (error) {
        return next(error)
    }
}

const updateAddress = async(req,res,next)=>{
    try {
        await Address.findByIdAndUpdate(req.body.id,req.body.updatedAddress)
        res.status(200).json({
            success:true,
            message:"Address Updated"
        })
    } catch (error) {
        
    }
}

module.exports={userLoginController,userRegisterController,addAddress,getAllAddressById,updateAddress}