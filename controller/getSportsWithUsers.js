// Assuming you have the required models
const sport = require("../db/models/sport");
const user = require("../db/models/user");

// Function to fetch the user by id
const getUser = async (id) => {
  const userRecord = await user.findOne({ where: { id } });
  return userRecord; // Returning user object
};

const getSportsWithCreators = async (req, res) => {
  try {
    // Fetch all sports along with their creator's user_id
    const sports = await sport.findAll();

    // Create an array of promises for each sport to fetch its creator
    const sportsWithCreators = await Promise.all(
      sports.map(async (sport) => {
        const creator = await getUser(sport.user_id); // Fetch the creator for each sport
        return {
          sportName: sport.name,
          creatorName: creator ? creator.name : "Unknown", // Handle if creator is not found
        };
      })
    );

    return res.status(200).json(sportsWithCreators);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error fetching sports with creator names",
      error: err.message,
    });
  }
};

module.exports = getSportsWithCreators;
