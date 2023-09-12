const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username:{type:String,required:true,},
    email: { type: String, required: true, unique: true },
    password:{type:String,required:true,},
    buyProduct:[{  type:mongoose.Schema.Types.ObjectId,ref:'product',}]

})

const UserModel=mongoose.model('users',UserSchema)
module.exports=UserModel