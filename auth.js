const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/person");

passport.use(
  new LocalStrategy(async (USERNAME, PASSWORD, done) => {
    // authentication logic here
    try {
      // console.log("Recevied Credentials: ", USERNAME, PASSWORD);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "User not found" });

      const isPasswordMatch = await user.comparePassword(PASSWORD);

      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
