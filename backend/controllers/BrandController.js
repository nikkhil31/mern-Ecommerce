import asyncHandler from 'express-async-handler'
import { body } from 'express-validator'
import handleValidation from '../middleware/handleValidation.js'
import Brand from '../models/brandModel.js'
import * as apiResponse from '../helper/apiResponse.js'

export const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({ status: 1 }).select(
    '-createdAt -updatedAt -__v'
  )
  return apiResponse.successResponseWithData(res, 'success', brands)
})

export const addbrand = [
  body('title').not().isEmpty().trim().isAlphanumeric(),
  handleValidation,
  asyncHandler(async (req, res) => {
    let brand = new Brand(req.body)
    brand = await brand.save()

    return apiResponse.successResponseWithData(res, 'success', {
      _id: brand._id,
      title: brand.title,
    })
  }),
]

export const updateBrand = [
  body('title').not().not().isEmpty().trim().isAlphanumeric(),
  body('brand').not().isEmpty().trim().isAlphanumeric(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.body.brand)

    if (brand) {
      req.body.title && (brand.title = req.body.title)

      let updatedBrand = await brand.save()

      return apiResponse.successResponseWithData(res, 'success', {
        _id: updatedBrand._id,
        title: updatedBrand.title,
      })
    }

    return apiResponse.notFoundResponse(res, 'Brand not found!')
  }),
]

export const deleteBrand = [
  body('brand').not().isEmpty().trim().isAlphanumeric(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.body.brand)

    if (brand) {
      await brand.remove()
      return apiResponse.successResponse(res, 'success')
    }

    return apiResponse.notFoundResponse(res, 'Brand not found!')
  }),
]
