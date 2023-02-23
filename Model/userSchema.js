const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: Number,
    number:Number
});

module.exports = mongoose.model('students',studentSchema);