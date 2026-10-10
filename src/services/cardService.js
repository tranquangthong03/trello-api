import { cardModel } from '~/models/cardModel'
const createNew = async (reqBody) => {
  const newColumn = {
    ...reqBody
  }
  const createdCard = await cardModel.createNew(newColumn)
  const getNewCard = await cardModel.findOneById(createdCard.insertedId)
  return getNewCard
}


export const cardService = {
  createNew

}