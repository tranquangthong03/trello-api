import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict()
  })
  try {
    console.log(req.body)
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate dữ liệu xong sẽ được chạy qua tầng controller
    next()
  } catch (error) {
    console.log(error)
    console.log(new Error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}