const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    product_id: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default:''
    },
    image: {
        type: String,
        default:''
    },
    brand: {
        type: String,
        default:''
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref:'Category',
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default:0
    },
    numReviews: {
        type: Number,
        default:0
    },
},{timestamps:true})


const Product = mongoose.model('Product', productSchema)
module.exports = Product