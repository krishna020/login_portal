const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    First_Name:String,
    Last_Name:String,
    User_Name:String,
    Email:String,
    Pass:String,
    Phone_Number:Number,
    User_type:String
      
},
{
    timestamps: true
  }
)

module.exports=mongoose.model('User',userSchema)