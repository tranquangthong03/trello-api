import { slugify } from '~/utils/formartters'
import { boardModel } from '~/models/boardModel'
import { GET_DB } from '~/config/mongodb'
const createNew = async (reqBody) => {
  const newBoard = {
    ...reqBody,
    slug: slugify(reqBody.title)
  }
  const createdBoard = await boardModel.createNew(newBoard)
  console.log(createdBoard)
  const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
  console.log(getNewBoard)
  return getNewBoard
}


export const boardService = {
  createNew
}