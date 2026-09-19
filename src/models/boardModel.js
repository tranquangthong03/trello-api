import Joi from 'joi'

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().min(3).max(50).trim().strict(),
  slug: Joi.string().min(3).trim().strict(),
  description: Joi.string().min(3).max(256).trim().strict(),
  columnOrderIds: Joi.array().items(Joi.string()).default([]), // Array là kiểu dữ liệu, item() là quy định từng dữ liệu trong array, default là set mặc định mới tạo là 1 mảng rỗng
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)

})

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA
}