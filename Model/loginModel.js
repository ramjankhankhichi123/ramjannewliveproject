const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    email: {
        type:String,
        required:[true,'Please add email']
       },
       password: {
        type:Number,
        required:[true,'Please add a password']
       },
});

module.exports = mongoose.model('Login',studentSchema);