

import dns from 'node:dns'
import { env } from '~/config/environment'
dns.setServers((process.env.MONGODB_DNS_SERVERS || '1.1.1.1,8.8.8.8').split(','))

const MONGODB_URI = env.MONGODB_URI

const DATABASE_NAME = env.DATABASE_NAME

import { MongoClient, ServerApiVersion } from 'mongodb'
let trelloDatabaseInstance = null

const mongoClientInstance = new MongoClient(MONGODB_URI,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    },
    tls: true,
    tlsAllowInvalidCertificates: true // thêm dòng này
  }
)
// Kết nối tới database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới mongodb atlas với uri đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()

  // Kết nối thành công thì lấy ra database có DATABASE_NAME và gán ngược lại nó vào biến trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}
export const CLOSE_DB = () => {
  return mongoClientInstance.close()
}