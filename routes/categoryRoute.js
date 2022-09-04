const express = require('express')
const router = express.Router()
const {authJwt}= require('../middleware');
const categories = require('../controllers/categories')

router.get('/', categories.index)
router.get('/:id', categories.show)
router.post('/store',[authJwt.verifyToken, authJwt.isAdmin],categories.store)
router.put('/update/:id',categories.update)
router.delete('/delete/:id',categories.destroy)

module.exports = router