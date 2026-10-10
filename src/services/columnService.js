import { columnModel } from '~/models/columnModel'
const createNew = async (reqBody) => {
  const newColumn = {
    ...reqBody
  }
  const createdColumn = await columnModel.createNew(newColumn)
  const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)
  return getNewColumn
}


export const columnService = {
  createNew

}