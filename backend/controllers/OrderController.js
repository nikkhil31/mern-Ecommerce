import asyncHandler from 'express-async-handler'
import { body } from 'express-validator'
import handleValidation from '../middleware/handleValidation.js'
import * as apiResponse from '../helper/apiResponse.js'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

export const placeOrder = [
  body('orderItem.*.product').not().isEmpty(),
  body('orderItem.*.quantity').not().isEmpty(),
  handleValidation,
  asyncHandler(async (req, res) => {
    for (const prod of req.body.orderItem) {
      const product = await Product.findById(prod.product)
      product.stock = product.stock - prod.quantity
      await product.save()
    }

    // return

    let order = new Order({
      user: req.user._id,
      orderItem: req.body.orderItem,
      status: 1,
    })
    order = await order.save()

    return apiResponse.successResponseWithData(res, 'success', order)
  }),
]
