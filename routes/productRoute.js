const express = require('express')
const router = express.Router()

const products = require('../controllers/products')
const {authJwt}= require('../middleware')
const upload = require('../middleware/upload')

router.get('/', products.getProduct)
router.get('/show/:id',products.show)
router.post('/store',authJwt.verifyToken, authJwt.isAdmin,upload.single('excel'),products.uploadproduct)
router.delete('/delete/:id',products.destroy)
router.get('/total/count',products.totalCount)
router.get('/get/featured/:count',products.getFeaturedlimit)

module.exports = router

