import { validationResult } from 'express-validator'
import * as apiResponse from '../helper/apiResponse.js'

const handleValidation = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return apiResponse.successResponseWithData(
      res,
      'Validation failed!',
      errors.array({ onlyFirstError: true }).map(r => ({ [r.param]: r.msg }))
    )
  }

  return next()
}

export default handleValidation
