const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    productId:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
},{timestamps: true})


const addCart = mongoose.model('cart', cartSchema)
module.exports = addCart

