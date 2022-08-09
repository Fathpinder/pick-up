const seedUsers = require('./user-seeds');
const seedEvents = require('./event-seeds');
const seedParks = require('./park-seeds');
const seedRSVP = require('./rsvp-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedEvents();
  console.log('--------------');

  await seedParks();
  console.log('--------------');

  await seedRSVP();
  console.log('--------------');

  process.exit(0);
};

seedAll();
