
import express from 'express'
import exitHook from 'async-exit-hook'
import { mapOrder } from '~/utils/sorts.js'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import 'dotenv/config'
import { env } from '~/config/environment'
const app = express()


const START_SERVER = () => {
  app.get('/', (req, res) => {
    // Test Absolute import mapOrder
    console.log(mapOrder(
      [{ id: 'id-1', name: 'One' },
        { id: 'id-2', name: 'Two' },
        { id: 'id-3', name: 'Three' },
        { id: 'id-4', name: 'Four' },
        { id: 'id-5', name: 'Five' } ],
      ['id-5', 'id-4', 'id-2', 'id-3', 'id-1'],
      'id'
    ))
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Quang Thong, I am running at ${ env.APP_HOST }:${ env.APP_PORT }/`)
  })
  exitHook(() => {
    console.log('Đang ngắt kết nối DB!')
    CLOSE_DB()
    console.log('Đóng cơ sở dữ liệu thành công!')
  })
}

(async () => {
  try {
    console.log('Đang kết nối tới dữ liệu!')
    await CONNECT_DB()
    console.log('Kết nối tới dữ liệu thành công')
    START_SERVER()
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
})()