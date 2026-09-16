import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'
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
    // Nếu có lỗi thì thực hiện xử lý lỗi tập trung ở middleware error handling
    // Hàm next nhận vào 1 tham số là error
    // Class ApiError nhận vào 2 tham số là statuscode và error message
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

export const boardValidation = {
  createNew
}