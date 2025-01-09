const express = require("express");
const { addSport, deleteSport } = require("../controller/sportController");
const isAdmin = require("../middleware/adminMiddleware"); // Rename to authMiddleware for clarity

const router = express.Router();
router.post("/", isAdmin, addSport);
router.get("/", isAdmin, (req, res) => {
  res.render("sport");
});
router.get("/remove/:id", isAdmin, deleteSport);

module.exports = router;
