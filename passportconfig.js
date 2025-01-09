// passportConfig.js

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./db/models/user");
const passport = require("passport");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          // console.log("User not found");
          return done(null, false, { message: "Incorrect email or password." });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          // console.log("Invalid password");
          return done(null, false, { message: "Incorrect email or password." });
        }

        // console.log("Authentication successful");
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize user into session (storing user id)
passport.serializeUser((user, done) => {
  // console.log("inside serial :" + user.id);
  done(null, user.id);
});

// Deserialize user from session (retrieving user data by id)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    // console.log("successfully deserialised:", user.name);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
module.exports = passport;
