const passport = require("passport");
const User = require("../db/models/user");
const bcrypt = require("bcryptjs");
const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role ? role : "player",
    });
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
const login = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  // failureFlash: true,
});

module.exports = { signup, login };
