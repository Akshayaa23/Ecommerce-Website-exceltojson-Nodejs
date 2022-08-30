const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    items:{
        type: Array,
        ref:'cart'
    },
    quantity: {
        type: Number
    },
    total: {
        type: Number
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'user'
    },
    orderstatus:{
        type:String,
        enum : ['ordered','pending'],
        default :'ordered'
    }
},{timestamps:true})

const Order = mongoose.model('order', orderSchema)
module.exports = Order
