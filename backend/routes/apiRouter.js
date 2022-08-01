import express from 'express'
const router = express.Router()

import * as AuthController from '../controllers/AuthController.js'
import * as ProductController from '../controllers/ProductController.js'
import * as BrandController from '../controllers/BrandController.js'
import * as OrderController from '../controllers/OrderController.js'

import { loginRequired } from '../middleware/authentication.js'

router.post('/auth', AuthController.login)

router.post('/register', AuthController.register)

router
  .route('/brand')
  .get(BrandController.getBrands)
  .post(loginRequired, BrandController.addbrand)
  .put(loginRequired, BrandController.updateBrand)
  .delete(loginRequired, BrandController.deleteBrand)

router.get('/products', ProductController.getProducts)

router
  .route('/product')
  .get(ProductController.getProduct)
  .post(loginRequired, ProductController.addProduct)
  .put(loginRequired, ProductController.updateProduct)
  .delete(loginRequired, ProductController.deleteProduct)

router.route('/order').post(loginRequired, OrderController.placeOrder)
// router.route('/order').post((req, res) => res.json('hii'))

export default router
