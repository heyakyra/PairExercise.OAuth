const Router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { User } = require("./db");
module.exports = Router;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1044276389797-5cfotuf6prsnlkjhv653u46le7jn1erb.apps.googleusercontent.com",
      clientSecret: "QKiFAE_Xc_amP5CkFHgOS1fw",
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async (token, refreshToken, profile, done) => {
      // console.log("---", "in verification callback", profile, "---");
      const user = (await User.findOrCreate({
        where: {
          googleId: profile.id,
          email: profile.emails[0].value,
          imageUrl: profile.photos[0].value
        }
      }))[0];
      done(null, user);
    }
  )
);

Router.get("/", passport.authenticate("google", { scope: "email" }));

Router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
);
