// models/index.js
const User = require("./user");
const Sport = require("./sport");
const Session = require("./session");

// Define associations here
User.hasMany(Sport, { foreignKey: "user_id", as: "CreatedSports" });
Sport.belongsTo(User, { foreignKey: "user_id", as: "Creator" });

User.hasMany(Session, { foreignKey: "user_id", as: "CreatedSessions" });
Session.belongsTo(User, { foreignKey: "user_id", as: "Creator" });

Sport.hasMany(Session, { foreignKey: "sport_id", as: "Sportsessions" });
Session.belongsTo(Sport, { foreignKey: "sport_id", as: "Sport" });

User.belongsToMany(Session, {
  through: "SessionParticipants",
  as: "Joinedsessions",
});
Session.belongsToMany(User, {
  through: "SessionParticipants",
  as: "Participants",
});

module.exports = { User, Sport, Session };
