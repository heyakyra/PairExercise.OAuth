const Router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
module.exports = Router;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1044276389797-5cfotuf6prsnlkjhv653u46le7jn1erb.apps.googleusercontent.com",
      clientSecret: "QKiFAE_Xc_amP5CkFHgOS1fw",
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    (token, refreshToken, profile, done) => {
      console.log("---", "in verification callback", profile, "---");
      done();
    }
  )
);

Router.get("/google", passport.authenticate("google", { scope: "email" }));

Router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
);
