const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database"); // Replace with your Sequelize instance

const SessionParticipants = sequelize.define("SessionParticipants", {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "User",
      key: "id",
    },
  },
  session_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Session",
      key: "id",
    },
  },
});
module.exports = SessionParticipants;
