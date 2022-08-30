const express = require('express')
const router = express.Router()

const categories = require('../controllers/categories')

router.get('/', categories.index)
router.get('/:id', categories.show)
router.post('/store',categories.store)
router.put('/update/:id',categories.update)
router.delete('/delete/:id',categories.destroy)

module.exports = router