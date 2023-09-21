const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, 'A username is required']
    },
    password: {
        type: String,
        required: [true, "A password is required"]
    }
})

module.exports = mongoose.model('User', userSchema);