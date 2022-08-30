const router = require('express').Router()

const products = require('../controllers/products')

router.get('/', products.index)
router.get('/show/:id',products.verifyToken, products.show)
router.post('/store',products.store)
router.put('/update/:id',products.update)
router.delete('/delete/:id',products.destroy)
router.get('/total/count',products.totalCount)
router.get('/get/featured/:count',products.getFeaturedlimit)

module.exports = router