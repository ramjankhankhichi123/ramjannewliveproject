const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const db = require('../config');
db();
const mongodb = require('mongodb');
const User = require('../Model/productModel');
const asyncHandler = require('express-async-handler');


const getproduct = async (req, res) => {
    let data = await User.findById();
    console.log("======>",data);
     res.status(201).json({
        token: generateToken(User._id)
    })
    // const { title,
    //     dis,
    //     price,
    //     quentity,
    //     Image} = await User.find(User.title)
    // res.status(201).json({
    //     title,
    //     dis,
    //     price,
    //     quentity,
    //     Image,
    //     token: generateToken(User._id)

    // })
   
}
const addproduct = asyncHandler(async (req, res) => {

    const { title, dis, price, quentity, Image } = req.body
    if (!title || !dis || !price || !quentity || !Image) {
        res.status(400)
        throw new Error("please add all fields");
    }
    if(generateToken){
    const data = await User.create({
        title,
        dis,
        price,
        quentity,
        Image,
        // token: generateToken(User._id)

    })
}
    res.json({
        title,
        dis,
        price,
        quentity,
        Image,
        token: generateToken(User._id)
    })
})




const updateproduct = asyncHandler(async (req, res) => {
    let findid = await User.findById(req.params._id);
    if (!findid) {
        res.status(400);
        res.send("user not found");
    }
    if(generateToken){
    const updateusers = await User.findByIdAndUpdate(req.params._id, req.body, {
        new: true
    
    })
    console.log("=====>", updateusers);
    res.status(200).json({
        token: generateToken({message: `data is update`})
    })
}
   
    
   
})



const deleteproduct = asyncHandler(async (req, res) => {
    let findid = await User.findById(req.params._id);
    if (!findid) {
        res.status(400);
        res.send("user not found");
    }
    if(generateToken){
    await findid.remove();
    }

    res.status(200).json({ message: `delete data ${req.params._id}` });
})



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
module.exports = {
    getproduct, addproduct, updateproduct, deleteproduct
}