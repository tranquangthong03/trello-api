import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { boardService } from '~/services/boardService'
const createNew = async (req, res, next) => {
  try {
    const createBoard = await boardService.createNew(req.body)
    // Điều hướng dữ liệu qua service
    res.status(StatusCodes.CREATED).json(createBoard)
    // Tự động chạy sang middleware error handling ở file server nếu có lỗi
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}