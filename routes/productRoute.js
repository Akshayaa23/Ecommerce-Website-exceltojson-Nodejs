const express = require('express')
const router = express.Router()

const products = require('../controllers/products')
const {authJwt}= require('../middleware')

router.get('/', products.index)
router.get('/show/:id', products.show)
router.post('/store',[authJwt.verifyToken, authJwt.isAdmin],products.store)
router.put('/update/:id',products.update)
router.delete('/delete/:id',products.destroy)
router.get('/total/count',products.totalCount)
router.get('/get/featured/:count',products.getFeaturedlimit)

module.exports = router

