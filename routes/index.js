const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET

router.get('/status', (req, res) => {
  res.send({ status: 'OK' })
})

const users = require('../resources/mockUsers.json')

router.post('/login', (req, res) => {
  const { username, password } = req.body

  const user = users.find((u) => {
    return u.username === username && u.password === password
  })

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret,
      { expiresIn: '1m' }
    )

    return res.json({
      accessToken,
    })
  }

  return res.status(401).json({ message: 'Username and password incorrect!' })
})

router.post('/verify', (req, res) => {
  const token = req.headers['x-api-token']
  if (!token) return res.status(401).json({ message: 'No token provided.' })

  jwt.verify(token, accessTokenSecret, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to verify token.' })

    const user = users.find((u) => {
      return decoded.username === u.username
    })

    if (!user) {
      return res.status(403).json({ message: 'Invalid token!' })
    }

    console.log(decoded)

    return res.json({
      accessToken: token,
    })
  })
})

module.exports = router
