require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const helmet = require('helmet')

const router = require('./routes')

app.use(helmet())
app.use(express.json())
app.use('/v1', router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
