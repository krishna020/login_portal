const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
const app=express();

const studentRouter=require('./api/routes/student')
const userRouter=require('./api/routes/User')

mongoose.connect("mongodb://127.0.0.1:27017/db")


mongoose.connection.on('connected',connected=>
{
    console.log('database is connected..')
})



mongoose.connection.on('error',err=>
{
    console.log('Fail to connect to the database...')
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/student',studentRouter)
app.use('/user',userRouter)

app.use((req,res,next)=>
{
    res.status(404).json({
        message:'bad request...'
    })
})

 /*
 app.use((req,res,next)=>
{
    res.json({
        message:'app server'
    })
})
*/

module.exports=app;