const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', userSchema)
// the string should be singular because the data base will create a collections called users

module.exports = User
