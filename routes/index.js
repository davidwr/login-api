const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET

router.get('/status', (req, res) => {
  res.send({ status: 'OK' })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body

  const users = require('../resources/mockUsers.json')
  const user = users.find((u) => {
    return u.username === username && u.password === password
  })

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret,
      { expiresIn: '1d' }
    )

    return res.json({
      accessToken,
    })
  }

  return res.status(401).json({ message: 'Username and password incorrect!' })
})

module.exports = router
