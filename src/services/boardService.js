import { slugify } from '~/utils/formartters'
import { boardModel } from '~/models/boardModel'
import { GET_DB } from '~/config/mongodb'
import { cloneDeep } from 'lodash'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
const createNew = async (reqBody) => {
  const newBoard = {
    ...reqBody,
    slug: slugify(reqBody.title)
  }
  const createdBoard = await boardModel.createNew(newBoard)
  const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
  return getNewBoard
}

const getDetails = async (reqId) => {
  try {
    const board = await boardModel.getDetails(reqId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board is not found!')
    }
    //B1: clone ra 1 board mới không ảnh hưởng gì tới board ở trên
    const resBoard = cloneDeep(board)
    //B2: Đưa card vào trong column tương ứng, lặp qua từng phần tử trong columns để đưa tất cả các card thuộc column đó vào trong
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    // B3: xóa trường cards khong cần thiết trong board
    delete resBoard.cards
    return resBoard
  } catch (error) {
    throw new Error(error)
  }
}
export const boardService = {
  createNew,
  getDetails
}