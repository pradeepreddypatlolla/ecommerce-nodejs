const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    firstName :{
        type: String,
        
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    // address:[
    //     {
    //         type:mongoose.SchemaTypes.ObjectId,
    //         ref:'Address'
    //     }
    // ],
    // cart:
    //     {
    //         type:mongoose.SchemaTypes.ObjectId,
    //         ref:'Cart'

    //     }
        
    // ,
    wishlist:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:'Product'
        }
    ],
   
},)
UserSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });
  
  UserSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
  };
  UserSchema.methods.generateToken = async function generateToken(id,options){
    //console.log(id);
    const token = await JWT.sign({id:id},process.env.JWT_SECRET,options)
    return token
  }
const User = mongoose.model('User',UserSchema)

module.exports=User
