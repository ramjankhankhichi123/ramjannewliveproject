const express = require('express');
const app = express();
const mongodb = require('mongodb')
const db = require('./config');
app.use(express.json())


app.get("/",async(req,res)=>{
   let dataa = await db();  
   let result = await dataa.find().toArray();
   console.log(result);
    res.send(result);
})
app.post("/",async(req,res)=>{
 let data =  await db();
//  let result =  await data.insertOne({name:"bheiji",class:"c",address:"pbc",email:"bheiji@gmail.com"})
 let result = await data.insertOne(req.body);
 res.send(result);
 })
 app.put("/:_id",async(req,res)=>{
    let data = await db();
    let result = await  data.updateOne({_id: new mongodb.ObjectId(req.params._id)},{$set:req.body});
    res.send(result);
    console.log(result);
 })
 app.delete("/delete/:_id",async(req,res)=>{
 let data = await db();
 let result =  await data.deleteOne(req.body)  ;
 res.send(result);
 })
app.listen(4000);