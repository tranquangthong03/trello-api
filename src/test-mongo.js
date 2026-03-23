const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = 'mongodb+srv://quangthongdev:vcqaPe8Z614fgPwU@ac-9qon26c.ghftqag.mongodb.net/?retryWrites=true&w=majority'
// Thay <user> và <pass> bằng thông tin thật của bạn

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true,
})

async function run() {
  try {
    await client.connect()
    console.log('✅ Connected successfully!')
  } catch (err) {
    console.error('❌ Error:', err.message)
  } finally {
    await client.close()
  }
}
run()