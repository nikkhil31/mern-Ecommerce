import asyncHandler from 'express-async-handler'
import { body } from 'express-validator'
import Product from '../models/productModel.js'
import * as apiResponse from '../helper/apiResponse.js'
import handleValidation from '../middleware/handleValidation.js'

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ stock: { $gt: 0 } })
    .populate('brand')
    .select('-createdAt -updatedAt -__v')

  return apiResponse.successResponseWithData(res, 'success', products)
})

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.query.product).select(
    '-createdAt -updatedAt -__v'
  )
  return apiResponse.successResponseWithData(res, 'success', product)
})

export const addProduct = [
  body('name').not().isEmpty().trim(),
  body('brand').not().isEmpty().trim(),
  body('stock').not().isEmpty().trim(),
  body('price').not().isEmpty().trim(),
  body('image_link').not().isEmpty().trim(),
  body('description').not().isEmpty(),
  body('features.*').isLength({ max: 30 }),
  body('specification.*.title').not().isEmpty(),
  body('specification.*.value').not().isEmpty(),
  handleValidation,
  asyncHandler(async (req, res) => {
    let product = new Product(req.body)
    product = await product.save()

    return apiResponse.successResponseWithData(res, 'success', product)
  }),
]

export const updateProduct = [
  body('name').optional().trim(),
  body('brand').optional().trim(),
  body('stock').optional().trim(),
  body('price').optional().trim(),
  body('image_link').optional().trim(),
  body('description').optional(),
  body('features.*').isLength({ max: 30 }),
  body('specification.*.title').optional(),
  body('specification.*.value').optional(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.body.product)

    if (product) {
      req.body.name && (product.name = req.body.name)
      req.body.brand && (product.brand = req.body.brand)
      req.body.stock && (product.stock = req.body.stock)
      req.body.price && (product.price = req.body.price)
      req.body.image_link && (product.image_link = req.body.image_link)
      req.body.description && (product.description = req.body.description)
      req.body.features && (product.features = req.body.features)
      req.body.specification && (product.specification = req.body.specification)

      let updatedProduct = await product.save()

      return apiResponse.successResponseWithData(res, 'success', updatedProduct)
    }
  }),
]

export const deleteProduct = [
  body('product').not().isEmpty().trim().isAlphanumeric(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.body.product)

    if (product) {
      await product.remove()
      return apiResponse.successResponse(res, 'success')
    }

    return apiResponse.notFoundResponse(res, 'Product not found!')
  }),
]
