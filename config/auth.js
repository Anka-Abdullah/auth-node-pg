import passport from "passport";
import Google from "passport-google-oauth2";
import dotenv from "dotenv";
dotenv.config();
const GoogleStrategy = Google.Strategy;
const pass = passport;

pass.use(
  new GoogleStrategy(
    {
      clientID: process.env.G_CLIENT_ID,
      clientSecret: process.env.G_CLIENT_SECRET,
      callbackURL: `${process.env.URI_APP}/api/v1/users/auth/google/callback`,
      profileFields: ['id', 'email', 'first_name', 'last_name'],
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

pass.serializeUser(function (user, done) {
  console.log("serializeUser : ", user);
  done(null, user);
});

pass.deserializeUser(function (user, done) {
  console.log("serializeUser : ", user);
  done(null, user);
});

export default pass;
