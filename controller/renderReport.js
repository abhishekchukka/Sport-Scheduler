const Session = require('../db/models/session');
const SessionParticipants = require('../db/models/sessionParticipants');
const User= require('../db/models/user')
const renderReport = async (req, res) => {
    try {
      const userId = req.user.id; // Logged-in user ID
  
      // Fetch all sessions created by the user
      const sessions = await Session.findAll({
        where: { user_id: userId },
      });
  
      if (sessions.length === 0) {
        // Redirect to a "no reports" page if no sessions exist
        return res.render("noReports", { user: req.user });
      }
  
      // Prepare report data
      const reports = await Promise.all(
        sessions.map(async (session) => {
          // Fetch participants for the session
          const sessionParticipants = await SessionParticipants.findAll({
            where: { session_id: session.id },
          });
  
          // Get user details for each participant
          const participants = await Promise.all(
            sessionParticipants.map(async (sp) => {
              const participant = await User.findByPk(sp.user_id, {
                attributes: ["name"], // Only fetch the name
              });
              return participant ? participant.name : "Unknown";
            })
          );
  
          return {
            sessionId: session.id,
            sessionName: session.name || `Session ${session.id}`,
            date: session.date,
            time: session.time,
            venue: session.venue,
            participants,
            user:req.user
          };
        })
      );
  
      // Render the report page
      res.render("report", { reports });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error generating the report.");
    }
  };
  
  module.exports = renderReport;
  