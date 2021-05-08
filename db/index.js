const MongoClient = require('mongodb').MongoClient

const url = process.env.MONGO_DB_HOST
const dbName = process.env.MONGO_DB_DATABASE
const client = new MongoClient(url, { useUnifiedTopology: true })

let mongoInstance = null

const connect = async () => {
  return new Promise((resolve, reject) => {
    client.connect((err) => {
      if (err) {
        return reject(err)
      }
      console.log('Connected successfully to database!')
      mongoInstance = client.db(dbName)
      resolve(client)
    })
  })
}

const getInstance = async () => {
  if (!mongoInstance) {
    await connect()
  }

  return mongoInstance
}

module.exports = {
  connect,
  getInstance,
}
