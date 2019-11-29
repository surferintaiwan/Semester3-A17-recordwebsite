const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: false
    },
    userId: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Record', recordSchema)