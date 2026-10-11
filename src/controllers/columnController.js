import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'
const createNew = async (req, res, next) => {
  try {
    const createColumn = await columnService.createNew(req.body)
    // Điều hướng dữ liệu qua service
    res.status(StatusCodes.CREATED).json(createColumn)
    // Tự động chạy sang middleware error handling ở file server nếu có lỗi
  } catch (error) { next(error) }
}


export const columnController = {
  createNew
}