
const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
    title:{type:String,required:true,},
    productType:{type:String,required:true,},
    imgUrl:{type:String,required:true,},
    price:{type:Number,required:true,},
    quantity:{type:Number,required:true,},
    totalQuantity:{type:Number,required:true,},
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
     }
})

const ProductModel=mongoose.model('product',ProductSchema)

module.exports=ProductModel