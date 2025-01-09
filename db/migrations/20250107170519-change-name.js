"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "SessionParticipants",
      "SessionId",
      "session_id"
    );
  },
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "SessionParticipants",
      "UserId",
      "user_id"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "SessionParticipants",
      "session_id",
      "UserId"
    );
  },
};
