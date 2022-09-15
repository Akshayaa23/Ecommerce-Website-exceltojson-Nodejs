const { JsonWebTokenError } = require('jsonwebtoken')
const httpCode = require('../configs/codeMsg')
const gotocart = require('../database/models/gotocart')
const { listenerCount } = require('../database/models/product')
const Product = require('../database/models/product')
const User = require('../database/models/user')
const Order = require('../database/models/order')

const orderplace = async (req, res) => {
    try{
        let order = new gotocart({
            productId: req.body.productId,
            userId: req.userId,
        })
        await order.save()
        res.status(200).json({
            message: httpCode.orderplace,
            data: order
        })
    }catch (error) {
        res.status(400).json({
            message: httpCode.errmsg
        })
    }
}


const listcart = async (req, res) => {
    try {
        let orders = await gotocart.find({ userId: req.userId }).populate('productId')
        //orders = await gotocart.countDocuments({_id : orders.map(a=>a._id)})
//       let u= orders.find(a=>a._id)==orders.find(a=>a._id )
//       console.log(u)
// {
//     u.map(q=>{
//         return {
//             quntty : q
//         }
//     })
// }
        res.json({
            data: orders
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const orderDetails = async (req, res) => {
    try {
        let id = req.userId
        // let name = await User.findById(id,{name:1})
        let data = await gotocart.find({ userId: id }).populate('productId').populate('userId', 'name')
        let subtotal = data.reduce((a, d) => {
            return a += d.productId.price
        }, 0)
        let order = new Order({
            items: data.map(a => a.productId._id),
            quantity: data.length,
            total: subtotal,
            userId: id
        })
        await order.save()

        res.json({
            order
        })
    } catch (error) {
        res.status(404).json({
            error: httpCode.errmsg
        })
    }
};

const listOrder = async (req, res) => {
    try {
        let id = req.userId
        let result = await Order.find({ userId: id }).populate('userId',{name:1})
        let products = result.reduce((a, c) => {
            a = [...a, ...c.items]
            return a
        }, [])
        products = await Product.find({ _id: { $in: products }})
        res.json({
            result : result,
            items : products
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    listcart,
    orderplace, orderDetails, listOrder
}
