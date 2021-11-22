const mongoose=require('mongoose');

const LoanSchema= mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
  Users:{type:mongoose.Schema.Types.ObjectId,  ref: 'Users'},
    monthlyPayment:{
        type:Number,
    },
    tenure:{
        type: String,
    },
    
    amount:{
        type:String
    },
    totalPayment: {
        type:String
    },
   data:{
    type: Date,
    default:Date.now
   }
})

module.exports=mongoose.model("Loan", LoanSchema)