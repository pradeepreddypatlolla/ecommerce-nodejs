
const express = require('express')
const { getCartByUserId, updateCart } = require('../controllers/cartController')
const router = express.Router()

router.get('/getcart',getCartByUserId)
router.put('/updatecart',updateCart)

module.exports=router