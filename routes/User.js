const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const UserModel = require('../controller/User')

const UserRouter=express.Router()


UserRouter.post('/register',async(req,res)=>{
    const {email,password,username}=req.body
    try {
const user=await UserModel.findOne({email})
if(user){
    return res.json({ msg: "email already exists" });
}
const hashedPassword = await bcrypt.hash(password, 10);
const newUser=new UserModel({email,username,password:hashedPassword})
        await newUser.save()
        res.json({ msg: "User registered successfully" });
    } catch (error) {
        res.json(error)
    }
})

UserRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try {
const user=await UserModel.findOne({email})
if(!user){
    return res.json({ msg: "Email or password is incorrect" });
}
const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  return res.json({ msg: "Email or password is incorrect" });
}
const token = jwt.sign({ id: user._id }, "secret");
res.json({ token, userID: user._id });


 } catch (error) {
        res.json(error)
    }
})


module.exports=UserRouter