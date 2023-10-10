const express = require('express')
const userSchema = require('../model/userSchema');
const mongoose= require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const router = express.Router();

//get  method...
router.get('/', (req, res, next) => {
    userSchema.find()
        .then((result) => {
            res.status(200).json({
                userData: result
            })
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            })
        })
})

// post

router.post('/signup', (req, res, next) => {
    console.log(req.body.Pass)
    bcrypt.hash(req.body.Pass, 5, (err, hash)=> {
        console.log(hash)
        if (err) {
             return res.status(400).json({
                error: 'hii krishna'
            })
        }

        else {
            console.log('else part...')
            const user_data = new userSchema({
                _id: new mongoose.Types.ObjectId,
                First_Name: req.body.First_Name,
                Last_Name: req.body.Last_Name,
                User_Name: req.body.User_Name,
                Email: req.body.Email,
                Pass: hash,
                Phone_Number: req.body.Phone_Number,
                User_type:req.body.User_type
            })
            user_data.save()
                .then((result => {
                    console.log(result)
                    res.status(200).json({
                        newUser: result
                    })
                }))
                .catch((error) => {
                    res.status(400).json({
                        error: error
                    })
                })
        }
    });
})

router.post('/login',(req,res,next)=>
{
    userSchema.find({User_Name:req.body.User_Name})
    .exec()
    .then((user)=>
    {
        console.log('user :'+user.length)
        if(user.length<=0)
        {
            return res.status(401).json({
                message:'User Not found..'
            })
        }
        bcrypt.compare(req.body.Pass,user[0].Pass,(err,result)=>
        {
            if(!result)
            {
                res.status(401).json({
                    message:'Password Not match...'
                })
            }
            if(result)
            {
              const token= jwt.sign({
                 User_Name:user[0].User_Name,
                 User_type:user[0].User_type,
                Email:user[0].Email, 
                Phone_Number:user[0].Phone_Number
              },
              'this is dummy text',
              {
                expiresIn:"24h"
              }
              );
              res.status(200).json({
                User_Name:user[0].User_Name,
                User_type:user[0].User_type,
                Email:user[0].Email,
                Phone_Number:user[0].Phone_Number,
                token:token
              })
            }
        })
    })
    .catch((err)=>
    {
        res.status(400).json({
            err:'hii krishna...'
        })
    })
})

module.exports = router;