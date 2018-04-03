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
      try {
        const user = (await User.findOrCreate({
          where: {
            googleId: profile.id,
            email: profile.emails[0].value,
            imageUrl: profile.photos ? profile.photos[0].value : undefined
          }
        }))[0];
        done(null, user);
      } catch (error) {
        done(error)
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findById(id)
  .then((user)=>{
    done(null,user)
  })
  .catch((err)=>{
    done(err)
  })
})

Router.get("/", passport.authenticate("google", { scope: "email" }));

Router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
);
