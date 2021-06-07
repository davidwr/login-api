const express = require('express')
const router = express.Router()
var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/v1/facebook/callback',
      profileFields: ['email'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(
        JSON.stringify({
          accessToken,
          refreshToken,
          profile,
        })
      )

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

router.get('/login', passport.authenticate('facebook', { scope: ['email'] }))

router.get(
  '/callback',
  passport.authenticate('facebook', { failureRedirect: '/status' }),
  (req, res) => {
    res.send({ success: true })
  }
)

module.exports = router
