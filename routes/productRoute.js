const express = require('express')
const multer = require('multer')
const path=require('path')
const { uploadImage, addProduct, getAllProducts, getProductById, getProductByCategory, updateProductById, deleteProductById, addUserRating } = require('../controllers/productController')
const router = express.Router()
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,"../images/products"))
    },
    filename: function (req, file, cb) {
        console.log(file);
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

router.post('/imageupload',upload.single('imageupload'),uploadImage)
router.post('/add',addProduct)
router.get('/getall',getAllProducts)
router.get('/getbyid',getProductById)
router.get('/getbycategory',getProductByCategory)
router.put('/updatebyid',updateProductById)
router.delete('/deletebyid',deleteProductById)
router.post('/add-userrating',addUserRating)
module.exports = router