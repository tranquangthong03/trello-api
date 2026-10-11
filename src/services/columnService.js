import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
const createNew = async (reqBody) => {
  const newColumn = {
    ...reqBody
  }
  const createdColumn = await columnModel.createNew(newColumn)
  const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

  if (getNewColumn) {
    // Xử lý cấu trúc data ở đây trước khi trả về dữ liệu
    getNewColumn.cards = []
    // Cập nhất mảng columnsOrderIds trong collection boards
    await boardModel.pushColumnOrderIds(getNewColumn)
  }
  return getNewColumn
}


export const columnService = {
  createNew

}