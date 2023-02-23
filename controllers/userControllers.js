const jwt = require('jsonwebtoken');
const db = require('../config');
db();
const bcrypt = require('bcryptjs')
const mongodb= require('mongodb');
const user = require('../Model/userSchema')
const login = require('../Model/loginModel')
const asyncHandler = require('express-async-handler');
const getuser=asyncHandler (async(req,res)=>{
    let data = await user.find();
    console.log("======>",data);
    res.status(200).json(data)
})

const setUsers= asyncHandler(async(req,res)=>{
    const { name , email,password,number} = req.body
    if(!name && !email,!password && !number){
        res.status(400)
        throw new Error('Please add a all body filds')
    }
    if(generateToken){
    let data= await user.create({name:req.body.name ,email:req.body.email,password:req.body.password,number:req.body.number})
    console.log("====>",data);
    res.json({
    //    id:_id,
       name,
       email,
       password,
       number,
        token: generateToken(user._id)
    })
    }
    res.status(200).json({token:generateToken(user._id)} )
})
const loginserver=asyncHandler(async (req,res)=>{

    const {email,password} = req.body;
    const userExists = await login.findOne({ email })
        if (userExists) {
            res.status(400);
            throw new Error('Email already exists')
        }
        const passexits = await login.findOne({password})
        if(passexits){
            res.status(400);
            throw new Error('Password already exists')
        }
        if(generateToken){
        
    let result = await login.create({email:req.body.email,password:req.body.password});
    res.status(200).json({
        name,
        email,
        password,
        number,
         token: generateToken(user._id)
         
    })
        }
    
})


const updateuser=asyncHandler( async (req,res)=>{
    let findid = await user.findById(req.params._id);
    if(!findid){
        res.status(400);
        res.send("user not found");
    }
    if(generateToken){
    const updateusers = await user.findByIdAndUpdate(req.params._id,req.body,{
        new : true
    })
    
    console.log("=====>",updateusers);
}
    res.status(200).json({message : `updatedata ${req.params._id}`})
})

const deleteuser= asyncHandler( async(req,res)=>{
    let findid = await user.findById(req.params._id);
    if(!findid){
        res.status(400);
        res.send("user not found");
    }
    if(generateToken){
     await findid.remove();
    }

   
    res.status(200).json({message: `delete data ${req.params._id}`});
})





const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
    expiresIn :'30d',
   })
   }

module.exports={
    getuser,
    setUsers,
    updateuser,
    deleteuser,
    loginserver,
    

}