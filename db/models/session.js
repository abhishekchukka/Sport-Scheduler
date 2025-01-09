"use strict";
const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../config/database");
module.exports = sequelize.define(
  "Session",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    venue: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    participants: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "User", // Table name of Users
        key: "id",
      },
    },
    sport_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Sport", // Table name of Users
        key: "id",
      },
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "Session",
  }
);
