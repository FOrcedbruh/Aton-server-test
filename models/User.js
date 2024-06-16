const {Schema, model } = require('mongoose');



const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


module.exports = model('User', UserSchema);