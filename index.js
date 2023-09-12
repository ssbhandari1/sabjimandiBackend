require('dotenv').config();
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const UserRouter = require('./routes/User')
const ProductRouter = require('./routes/Products')
const PORT =process.env.PORT || 4001
const DB = process.env.DATABASE
const app=express()
app.use(express.json())
app.use(cors())

app.use('/',UserRouter)
app.use('/product',ProductRouter)

mongoose.connect(DB,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })


  app.listen(PORT,()=>{
    console.log('Server Started')
  })