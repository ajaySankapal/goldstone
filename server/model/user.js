const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        required: [true, 'Please provide the user name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide the users email.']
    },
    gender: {
        type: String,
    },
    status: {
        type: String,
    }
})


module.exports = mongoose.model('User', UserSchema)