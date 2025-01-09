// const { joinSQLFragments } = require("sequelize/lib/utils/join-sql-fragments");
const {
  createSession,
  updateSession,
} = require("../controller/sessionController");
const isAuthenticated = require("../middleware/authMiddleware");
const {
  joinSession,
  leaveSession,
} = require("../controller/sessionparticipants");
const showSessionUpdateForm = require("../controller/showSessionUpdateForm");
const showCreateSessionForm = require("../controller/showCreateSessionForm");
const deleteSession = require("../controller/deleteSession");
// const leaveSession = require("../controller/sessionparticipants");

const router = require("express").Router();

router.post("/", isAuthenticated, createSession);
router.get("/", isAuthenticated, showCreateSessionForm);
router.post("/join/:sessionId", isAuthenticated, joinSession);
router.get('/delete/:sessionId',isAuthenticated,deleteSession);
router.post("/leave/:sessionId", isAuthenticated, leaveSession);
router.post("/:sessionId", isAuthenticated, updateSession);
router.get("/:sessionId", isAuthenticated, showSessionUpdateForm);
module.exports = router;
