const { Schema, model } = require('mongoose');



const ClientSchema = new Schema({
    accNumber: {
        type: String,
        require: true,
    },
    surname: {
        type: String,
        require: true
    },
    name: {
        type: String,
        required: true
    },
    patronymic: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    INN: {
        type: Number,
        required: true
    },
    resFullname: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Не в работе'
    }
})


module.exports = model('Client', ClientSchema);