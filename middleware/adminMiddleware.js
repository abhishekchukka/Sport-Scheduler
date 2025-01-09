function isAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    // console.log("Authenticated user:", req.user);
    if (req.user.role === "admin") {
      return next();
    }
    return res.status(403).json({ message: "You are not authorized" });
  }
  return res.redirect('/login');
}

module.exports = isAdmin;
