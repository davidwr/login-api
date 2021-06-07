const express = require('express')
const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/v1/google/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await db.collection('users').insertOne({
          username: profile.emails[0].value,
          password: accessToken,
        })

        return cb(null, user)
      } catch (error) {
        return cb(error)
      }
    }
  )
)

router.get('/login', passport.authenticate('google', { scope: ['email'] }))

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/status' }),
  (req, res) => {
    res.send({ success: true })
  }
)

module.exports = router
