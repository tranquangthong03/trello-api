import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'
const createNew = async (req, res, next) => {
  try {
    const createCard = await cardService.createNew(req.body)
    // Điều hướng dữ liệu qua service
    res.status(StatusCodes.CREATED).json(createCard)
    // Tự động chạy sang middleware error handling ở file server nếu có lỗi
  } catch (error) { next(error) }
}


export const cardController = {
  createNew
}