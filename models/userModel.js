const mongoose=require('mongoose');

const UserSchema= mongoose.Schema({
    rents: {type:mongoose.Schema.Types.ObjectId,  ref: 'Loan'},
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   monthlyPayment:{
        type:Number,
    },
    rentAmount:{
        type:String
    },
   data:{
    type: Date,
    default:Date.now
   }
})

module.exports=mongoose.model("Users", UserSchema)