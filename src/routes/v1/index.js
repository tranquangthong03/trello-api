import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from '~/routes/v1/boardRoutes'
import { columnRoutes } from '~/routes/v1/columnRoutes'
import { cardRoutes } from '~/routes/v1/cardRoutes'
const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' })
})
//  Board APIs
Router.use('/boards', boardRoutes)
// Column APIs
Router.use('/columns', columnRoutes)
// Card APIs
Router.use('/cards', cardRoutes)
export const APIs_V1 = Router