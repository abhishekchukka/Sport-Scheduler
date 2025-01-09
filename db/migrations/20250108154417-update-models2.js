"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add `user_id` to `Sport`
    await queryInterface.changeColumn("Sport", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "User", // Assumes your Users table is named "User"
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    // Add `user_id` to `Session`
    await queryInterface.changeColumn("Session", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "User", // Assumes your Users table is named "User"
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    // Add `sport_id` to `Session`
    await queryInterface.changeColumn("Session", "sport_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Sport", // Assumes your Sport table is named "Sport"
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    // Change `name` column in `Sport` to be non-nullable and unique
    // await queryInterface.changeColumn("Sport", "name", {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    //   unique: true,
    // });

    // Add `participants` column to `Session`
    // await queryInterface.addColumn("Session", "participants", {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // });
  },

  async down(queryInterface, Sequelize) {
    // Remove `user_id` from `Sport`
    // await queryInterface.removeColumn("Sport", "user_id");
    // // Remove `user_id` from `Session`
    // await queryInterface.removeColumn("Session", "user_id");
    // await queryInterface.removeColumn("Session", "sport_id");
    // Remove `participants` from `Session`
    // await queryInterface.removeColumn("Session", "participants");
    // // Change `name` column back in `Sport`
    // await queryInterface.changeColumn("Sport", "name", {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    //   unique: false,
    // });
    // Drop `SessionParticipants` join table
    // await queryInterface.dropTable("SessionParticipants");
  },
};
