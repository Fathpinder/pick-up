const seedUsers = require("./user-seeds");
const seedParks = require("./park-seeds");
const seedEvents = require("./event-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("--------------");
  await seedUsers();
  console.log("--------------");

  await seedParks();
  console.log("--------------");

  await seedEvents();
  console.log("--------------");

  process.exi(0);
};

seedAll();
