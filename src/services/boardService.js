import { slugify } from '~/utils/formartters'
import { boardModel } from '~/models/boardModel'
import { GET_DB } from '~/config/mongodb'
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
    return board
  } catch (error) {
    throw new Error(error)
  }
}
export const boardService = {
  createNew,
  getDetails
}