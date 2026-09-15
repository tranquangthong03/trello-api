
import express from 'express'
import { mapOrder } from '~/utils/sorts.js'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import 'dotenv/config'
import { env } from '~/config/environment'
import { APIs_V1 } from './routes/v1'



const START_SERVER = () => {
  const app = express()

  app.use(express.json())

  app.use('/v1', APIs_V1)

  const server = app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Quang Thong, I am running at ${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${ env.APP_PORT } đang được sử dụng. Hãy dừng process cũ hoặc đổi APP_PORT trong .env.`)
      process.exit(1)
    }
    throw error
  })

  let shutdownPromise = null

  const shutdown = (signal) => {
    console.log(`Received ${signal}`)

    return new Promise((resolve) => {
      server.close(async () => {
        console.log('Server closed')

        await CLOSE_DB()

        console.log('Mongo closed')

        resolve()
      })

      server.closeAllConnections()
    }).then(() => {
      console.log('Shutdown completed')

      if (signal === 'SIGUSR2') {
        process.kill(process.pid, 'SIGUSR2')
      }
    })
  }

  process.once('SIGINT', () => shutdown('SIGINT'))
  process.once('SIGTERM', () => shutdown('SIGTERM'))
  process.once('SIGUSR2', () => shutdown('SIGUSR2'))
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