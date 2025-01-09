const express = require("express");
const { signup, login } = require("../controller/authController");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error during logout', error: err.message });
      }
      res.redirect('/login');  // Redirect to login page after logout
    });
  });
module.exports = router;
