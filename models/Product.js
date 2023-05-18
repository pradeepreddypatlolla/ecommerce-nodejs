const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
   
    name:{
        type:String
    },
    description:{
        type:String
    },
    brand:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    category:{
        type:String
    },
    
    sizes:{
        type:Array
    },
    images:{
        type:Array,
        default:[]
    },
    totalRating:{
        type:Number,
        default:0
    },
    userRatings:[
        {
            userId:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:'User'
            },
            rating:{
                type:Number,

            },
            review:{
                type:String
            }
        }
    ]
   
},)
const Product = mongoose.model('Product',ProductSchema)

module.exports=Product
