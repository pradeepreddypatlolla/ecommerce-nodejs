const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    
    userId:
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref:"User"

        },
  
    items:[
        
      { product:{
            type: mongoose.SchemaTypes.ObjectId,
            ref:"Product"

        },
        quantity:{
            type: Number
        },
        size:{
            type:Number
        },
        color:{
            type:String
        }
    }
    ],
   
},)
const Cart = mongoose.model('Cart',CartSchema)

module.exports=Cart
