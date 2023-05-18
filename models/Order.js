const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
       userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
       },
       lineItems:[{
            product:
                { 
                type:mongoose.SchemaTypes.ObjectId,
                ref:'Product'
                },
            quantity:{
                type:Number,

            },
            color:{
                type:String
            },
            size:{
                type:Number
            }
            
       }],
       transactionType:{
        type:String
       },
       Address:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Address"
       },
       status:{
        type:String
       }
       

},)
const Order = mongoose.model('Order',OrderSchema)

module.exports=Order
