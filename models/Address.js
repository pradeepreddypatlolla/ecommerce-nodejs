const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
    userId:
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref:"User"

        },
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pinCode:{
        type:String
    },
    country:{
        type:String
    }
  
},)
const Address = mongoose.model('Address',AddressSchema)

module.exports=Address
