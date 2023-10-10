const express=require('express')
const studentSchema=require('../model/studentSchema');
const { default: mongoose } = require('mongoose');

const router=express.Router();

//get  method...
router.get('/',(req,res,next)=>
{
   studentSchema.find()
   .then((result)=>
   {
     res.status(200).json({
        studentData:result
     })
   })
   .catch((error)=>
   {
    res.status(400).json({
        error:error
    })
   })
})

// post

router.post('/post',(req,res,next)=>
{
   const student=new studentSchema({
    _id:new mongoose.Types.ObjectId,
    First_Name:req.body.First_Name,
    Last_Name:req.body.Last_Name,
    User_Name:req.body.User_Name,
    Email:req.body.Email,
    Password:req.body.Password,
    Phone_Number:req.body.Phone_Number
})

student.save()
.then((result=>
    {
        console.log(result)
        res.status(200).json({
            newStudent:result
        })
    }))
    .catch((error)=>
    {
        res.status(400).json({
            error:error
        })
    })
})

module.exports=router;