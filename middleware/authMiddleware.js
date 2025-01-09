// authMiddleware.js

function isAuthenticated(req, res, next) {
  console.log("isAuthenticated called");
  console.log("User authenticated:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = isAuthenticated;
