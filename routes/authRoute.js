const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const orderControllers = require('../controllers/orderController')
const verifyToken = require('../middleware/verifyToken')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/addcart',verifyToken.checkToken,orderControllers.orderplace)
router.get('/listcart',verifyToken.checkToken,orderControllers.listcart)
router.post('/orderdetails',verifyToken.checkToken,orderControllers.orderDetails)
router.get('/listorder',verifyToken.checkToken,orderControllers.listOrder)

module.exports = router