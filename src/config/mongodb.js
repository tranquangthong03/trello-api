// quangthongdev
// password: vcqaPe8Z614fgPwU

const MONGODB_URI = 'mongodb+srv://quangthongdev:vcqaPe8Z614fgPwU@cluster0.ghftqag.mongodb.net/?appName=Cluster0'

const DATABASE_NAME = 'trello-database-quangthong'

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

  // Kết nối thành công thì lấy ra database có DATABASE_NAME và gán ngược lại nso vào biến trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}
export const CLOSE_DB = () => {
  return mongoClientInstance.close()
}