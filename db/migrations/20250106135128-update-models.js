"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add `user_id` to `Sport`
    await queryInterface.addColumn("Sport", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "User", // Assumes your Users table is named "User"
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    // Add `user_id` to `Session`
    await queryInterface.addColumn("Session", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "User", // Assumes your Users table is named "User"
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    // Add `sport_id` to `Session`
    await queryInterface.addColumn("Session", "sport_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Sport", // Assumes your Sport table is named "Sport"
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    // Change `name` column in `Sport` to be non-nullable and unique
    await queryInterface.changeColumn("Sport", "name", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    // Add `participants` column to `Session`
    await queryInterface.addColumn("Session", "participants", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    // Create `SessionParticipants` join table
    await queryInterface.createTable("SessionParticipants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      SessionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Session", // Assumes your Sessions table is named "Session"
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "User", // Assumes your Users table is named "User"
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove `user_id` from `Sport`
    await queryInterface.removeColumn("Sport", "user_id");

    // Remove `user_id` from `Session`
    await queryInterface.removeColumn("Session", "user_id");
    await queryInterface.removeColumn("Session", "sport_id");

    // Remove `participants` from `Session`
    await queryInterface.removeColumn("Session", "participants");

    // Change `name` column back in `Sport`
    await queryInterface.changeColumn("Sport", "name", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });

    // Drop `SessionParticipants` join table
    await queryInterface.dropTable("SessionParticipants");
  },
};
