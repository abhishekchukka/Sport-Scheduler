const express = require("express");
const Session = require("../db/models/session"); // Assuming you're using Sequelize

const showSessionUpdateForm = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await Session.findByPk(sessionId);

    if (!session) {
      return res.status(404).send({ message: "Session not found" });
    }

    // Pass the session data to the view if it's found
    res.render("updateForm", { session: session });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error retrieving session" });
  }
};

module.exports = showSessionUpdateForm;
