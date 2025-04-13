const passport = require('passport')

const googleStrategy = require('passport-google-oauth2').Strategy

const User = require('../models/user')

passport.use(new googleStrategy({
     clientID: process.env.GOOGLE_CLIENT_ID,
     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     callbackURL: "http://localhost:4000/api/v1/auth/google/callback",
     passReqToCallback: true
},
     async function (request, accessToken, refreshToken, profile, done) {
          try {
               console.log("inside callback after google auth")
               const existingUser = await User.findOne({ email: profile.emails[0].value })
               if (existingUser) {
                    return done(null, existingUser)
               }
               const user = await User.create({ 
                    username: profile.displayName, 
                    email: profile.emails[0].value,
                    profilePic:profile.picture ,
                    password:require('crypto').randomBytes(64).toString('hex')
                    // random password for google oauth registered users 
               })
               done(null, user)
          } catch (error) {
               done(error, null)
          }
     }))


passport.serializeUser(function (user, done) {
     console.log("inside serialize")
     return done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
     try {
          console.log("inside deserialize")
          const user = await User.findById(id);
          if (!user) {
               return done(new Error("User not found"), null);
          }
          return done(null, {_id: user._id, username: user.username, email: user.email,profilePic:user.profilePic});
     } catch (error) {
          return done(error, null);
     }
});