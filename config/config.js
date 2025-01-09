require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  // postgresql://sportsscheduler_9dor_user:AzxVszAWoqTGezJHItdpNOW8nR5lk9uw@dpg-cu00bra3esus73ade410-a/sportsscheduler_9dor
  
    production: {
      username: "sportsscheduler_9dor_user",
      password: "AzxVszAWoqTGezJHItdpNOW8nR5lk9uw",
      database: "sportsscheduler_9dor",
      host: "dpg-cu00bra3esus73ade410-a.oregon-postgres.render.com",
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Ensure SSL is enabled
        },
      },
    
  }
  
};
// console.log(process.env.port);
