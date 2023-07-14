const express=require("express")
const {UserModel}=require("../model/usermodel")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const userrouter=express.Router();

//register the user

userrouter.post("/register",async(req,res)=>{
    const { name, email, gender, password,city,age ,is_married } = req.body;



    try{
        const payload=req.body
        

        const user= await UserModel.findOne({email:payload.email});
        if(user)
        {
           return  res.status(200).send({msg:"User already exist, please login"});
        }
        else{
            const hashPassword=await bcrypt.hashSync(payload.password,6);
            payload.password=hashPassword;

            const newuser=new UserModel(payload);
            await newuser.save();

            return res.json({msg:"user registerd",user:newuser})
        }
    }
    catch(err)
    {
        res.status(400).send({msg:err.message});
    }
  
})


//login the user
userrouter.post("/login",async(req,res)=>{
    
    try{
        const payload=req.body;
        const user= await UserModel.findOne({email:payload.email});

        if(!user)
        {
            return    res.status(400).send({"msg":"please register first"});
        }


        const ispasscorrect=await bcrypt.compareSync(
            payload.password,
            user.password
        );

        if(ispasscorrect)
        {
             const token= await jwt.sign({email:user.email,userId:user._id},'masai')
             res.status(200).send({"msg":"Login success","token":token,"newuser":user});
        }
        else{
            res.status(400).send({"msg":"Wrong password"})
        }
    }catch(err){
        res.status(400).send({"msg":"Something wrong in login section",err})
    }
   
})

userrouter.get("/alluser",async(req,res)=>{
    try{
        const user=await UserModel.find()
        res.status(200).json({msg:"here are the all user",user})
    }catch(err)
    {
        console.log(err)
        res.status(400).json(err.message)
    }
})


module.exports={
    userrouter
}