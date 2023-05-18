const express=require('express');
const { userLoginController, userRegisterController, addAddress, getAllAddressById, updateAddress } = require('../controllers/userController');
const router = express.Router()

router.post("/register",userRegisterController)
router.post("/login",userLoginController);
router.post('/add-address',addAddress)
router.get('/getaddressesbyuserid',getAllAddressById)
router.put('/updateaddress',updateAddress)

module.exports=router