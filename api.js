const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

const helmet = require('helmet')
const router = require('./routes')

const db = require('./db')

let server = null
let dbConnection = null

async function start() {
  dbConnection = await db.connect()

  return new Promise((resolve) => {
    app.use(cors())
    app.use(helmet())
    app.use(express.json())
    app.use('/v1', router)

    server = app.listen(port, () => {
      console.log(`Server listening on ${server.address().port}!`)
      resolve(server)
    })
  })
}

async function shutdown() {
  if (server) {
    server.close()
  }

  if (dbConnection) {
    await dbConnection.close()
  }
}

module.exports = { start, shutdown }
