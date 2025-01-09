const express = require("express");
const Session = require("../db/models/session"); // Assuming you're using Sequelize
const User = require("../db/models/user"); // Assuming a Player model
const Sport = require("../db/models/sport"); // Assuming a Sport model

const showCreateSessionForm = async (req, res) => {
  try {
    // Fetch available players and sports
    const players = await User.findAll();
    const sports = await Sport.findAll();

    res.render("createSessionForm", { players, sports });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching data for the form" });
  }
};

module.exports = showCreateSessionForm;
