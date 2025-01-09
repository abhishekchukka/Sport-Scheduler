const Session = require("../db/models/session");
const SessionParticipants = require("../db/models/sessionparticipants");
// const User = require("../db/models/user");
const joinSession = async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.user.id;

  try {
    // 1. Validate session existence and status
    const session = await Session.findByPk(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // 2. Check if session is ongoing
    const inputDate = new Date(session.date);
    const today = new Date();

    const status =
      inputDate.getFullYear() <= today.getFullYear() &&
      inputDate.getMonth() <= today.getMonth() &&
      inputDate.getDate() <= today.getDate();

    if (status) {
      return res.status(400).json({ message: "Session is not ongoing" });
    }

    // 3. Ensure the user hasn’t already joined the session
    const existingParticipant = await SessionParticipants.findOne({
      where: { user_id: userId, session_id: sessionId },
    });
    if (existingParticipant) {
      return res
        .status(400)
        .json({ message: "You have already joined this session" });
    }

    // 4. Check participant count and ensure there's space in the session

    // 5. Add user to the session
    await SessionParticipants.create({
      user_id: userId,
      session_id: sessionId,
    });

    // 6. Redirect to dashboard after successfully joining
    return res.redirect("/dashboard");
  } catch (err) {
    console.error("Error during join session:", err);
    return res
      .status(500)
      .json({ message: "Error joining session", error: err.message });
  }
};
const leaveSession = async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.user.id;
  try {
    const userInSession = await SessionParticipants.findOne({
      where: { session_id: sessionId, user_id: userId },
    });
    if (!userInSession) {
      return res.status(404).json({ message: "User not in current session" });
    }
    await SessionParticipants.destroy({
      where: { session_id: sessionId, user_id: userId },
    });
    return res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to exit a  session", error: err.message });
  }
};

module.exports = { joinSession, leaveSession };
