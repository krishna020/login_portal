const mongoose=require('mongoose')

const studentSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    First_Name:String,
    Last_Name:String,
    User_Name:String,
    Email:String,
    Password:Number,
    Phone_Number:Number
      
},
{
    timestamps: true
  }
)

module.exports=mongoose.model('Std',studentSchema)