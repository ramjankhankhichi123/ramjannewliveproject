const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
   title: {
    type:String,
    required:[true,'Please add a title']
   },
   dis: {
    type:String,
    required:[true,'Please add a discription']
   },
   price: {
    type:Number,
    required:[true,'Please add a price']
   },
   quentity: {
    type:String,
    required:[true,'Please add a quentity']
   },
   Image: String,
   
},{
    timestamps:true
});

module.exports = mongoose.model('Product',studentSchema);