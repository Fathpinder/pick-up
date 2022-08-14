const Sequelize = require("sequelize");

require("dotenv").config();

// create connection to our db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "mysql",
      // dialectOptions: {
      //   declineNumbers: true,
      // },
    });

module.exports = sequelize;
