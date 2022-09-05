const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const orderControllers = require('../controllers/orderController')
const {authJwt} = require('../middleware')
const verifySignUp = require('../middleware/verifySignup')
router.post('/register',[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted], userController.signup)
router.post('/login',userController.signin)
router.post('/addcart',[authJwt.verifyToken, authJwt.isUser],orderControllers.orderplace)
router.get('/listcart',[authJwt.verifyToken, authJwt.isUser],orderControllers.listcart)
router.post('/orderdetails',[authJwt.verifyToken, authJwt.isUser],orderControllers.orderDetails)
router.get('/listorder',[authJwt.verifyToken, authJwt.isUser],orderControllers.listOrder)

module.exports = router