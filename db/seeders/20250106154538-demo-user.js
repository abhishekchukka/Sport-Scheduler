"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert(
    //   "User",
    //   [
    //     {
    //       name: "John Doe",
    //       email: "john.d2oe3241@example.com",
    //       password: "hashedPassword", // Don't forget to hash passwords in real apps
    //       role: "admin",
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );
    // await queryInterface.bulkInsert(
    //   "Sport",
    //   [
    //     {
    //       name: "basketball2434",
    //       user_id: 3639,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );
    // await queryInterface.bulkInsert(
    //   "Session",
    //   [
    //     {
    //       date: new Date(),
    //       time: "10:00:00",
    //       venue: "Stadium asivuisadv",
    //       participants: 5,
    //       user_id: 36,
    //       sport_id: 22,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {}
    // );
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Sports", null, {});
    // await queryInterface.bulkDelete("Sessions", null, {});
  },
};
