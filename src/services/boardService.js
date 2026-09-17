import { slugify } from '~/utils/formartters'

const createNew = async (reqBody) => {
  const newBoard = {
    ...reqBody,
    slug: slugify(reqBody.title)
  }

  return newBoard
}

export const boardService = {
  createNew
}