const Sport = require("../db/models/sport");

const addSport = async (req, res) => {
  const { name } = req.body;
  console.log(req.user.id);
  try {
    const newSport = await Sport.create({
      name: name.toLowerCase(),
      user_id: req.user.id,
    });
    return res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error creating sport", error: err.message });
  }
};

const deleteSport = async (req, res) => {
  const sport_id = req.params.id; // Extract sport_id from params
  try {
    // Find the sport by ID
    const sportGot = await Sport.findByPk(sport_id);

    if (!sportGot) {
      return res.status(404).json({
        message: "The sport you are trying to delete does not exist",
      });
    }

    // Delete the sport
    await Sport.destroy({ where: { id: sport_id } });

    return res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error deleting sport",
      error: err.message,
    });
  }
};
module.exports = { addSport, deleteSport };
