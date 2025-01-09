const Sport = require("../db/models/sport");
const Session = require("../db/models/session");
const SessionParticipants = require("../db/models/sessionParticipants");
const User = require("../db/models/user");
const createSession = async (req, res) => {
  // try {
  const { date, time, venue, participants, sportId} = req.body;
  const playerIds = req.body.playerIds.split(',').map((id) => parseInt(id.trim(), 10));

  // console.log({ date, time, venue, participants, sportId });
  const user_id = req.user.id;
  // const lowerCase = sportName.toLowerCase();

  // console.log("User in request:", playerIds);

  // Find the sport by name
  //   const sportGot = await Sport.findOne({ where: { name: sportName } });

  //   // Handle case where sport doesn't exist
  //   if (!sportGot) {
  //     return res.status(404).json({ message: "Sport not found" });
  //   }

  // Create the session
  try{
  const session = await Session.create({
    date,
    time,
    venue,
    participants,
    sport_id: sportId,
    user_id: req.user.id,
  });
    // await SessionParticipants.create({
    //   session_id: session.id,
    //   user_id, // The creator is also a participant
    // });
    if (playerIds && playerIds.length > 0) {
      const validPlayers = await User.findAll({
        where: {
          id: playerIds, // Find players by their IDs
        },
      });
      for (let player of validPlayers) {
        await SessionParticipants.create({
          session_id: session.id,
          user_id: player.id,
        });
      }

    return res.redirect('/dashboard')
    // return res.status(201).json({ session });
    // }
    }
  } catch (err) {
    console.error("Error creating session:", err);
  return res
    .status(500)
    .json({ message: "Failed to create session" });
};}
// const { Session, SessionParticipants } = require("../db/models");

const updateSession = async (req, res) => {
  const { sessionId } = req.params;
  const { date, time, venue, participants } = req.body; // Fields to update
  const userId = req.user.id; // Logged-in user's ID
  const userRole = req.user.role; // Logged-in user's role

  try {
    // Find the session
    const session = await Session.findByPk(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Check if the user is the session creator or an admin
    if (session.user_id !== userId && userRole !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to modify this session" });
    }

    // Validate and update the session details
    if (date) session.date = date;
    if (time) session.time = time;
    if (venue) session.venue = venue;
    if (participants) session.participants = participants;

    await session.save(); // Save changes to the database

    return res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to modify session",
      error: err.message,
    });
  }
};

module.exports = { updateSession, createSession };

// module.exports = createSession;
