const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const orderControllers = require('../controllers/orderController')
const {authJwt} = require('../middleware')
router.post('/register', userController.signup)
router.post('/login', userController.signin)
router.post('/addcart',[authJwt.verifyToken, authJwt.isModerator],orderControllers.orderplace)
router.get('/listcart',[authJwt.verifyToken, authJwt.isModerator],orderControllers.listcart)
router.post('/orderdetails',[authJwt.verifyToken, authJwt.isAdmin],orderControllers.orderDetails)
router.get('/listorder',[authJwt.verifyToken, authJwt.isAdmin],orderControllers.listOrder)

module.exports = router