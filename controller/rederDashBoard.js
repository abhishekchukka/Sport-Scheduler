const Sport = require("../db/models/sport");
const Session = require("../db/models/session");
const User = require("../db/models/user");
const SessionParticipants = require("../db/models/sessionParticipants");

const renderDashboard = async (req, res) => {
  try {
    // Fetch all sports along with their creators
    const sports = await Sport.findAll();

    // Fetch all sessions along with their related details
    const sessions = await Session.findAll();

    // Fetch creators and format data in parallel
    const sportsWithCreators = await Promise.all(
      sports.map(async (sport) => {
        const creator = await User.findByPk(sport.user_id);
        return {
          id: sport.id,
          name: sport.name,
          creatorName: creator ? creator.name : "Unknown",
        };
      })
    );

    const sessionsWithDetails = await Promise.all(
      sessions.map(async (session) => {
        const creator = await User.findByPk(session.user_id);
        const sport = await Sport.findByPk(session.sport_id);
        const isParticipant = await SessionParticipants.findOne({
          where: { session_id: session.id, user_id: req.user.id },
        });

        const currentParticipantCount = await SessionParticipants.count({
          where: { session_id: session.id },
        });
        return {
          id: session.id,
          time: session.time,
          venue: session.venue,
          date: session.date,
          participants: session.participants,
          sportName: sport ? sport.name : "Unknown",
          creatorName: creator ? creator : "Unknown",
          currentParticipantCount: currentParticipantCount,
          isParticipant:!!isParticipant,
        };
      })
    );

    // Render the dashboard view with the fetched data
    res.render("dashboard", {
      user: req.user,
      sports: sportsWithCreators,
      sessions: sessionsWithDetails,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading dashboard.");
  }
};

module.exports = renderDashboard;
