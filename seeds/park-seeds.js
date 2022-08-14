const sequelize = require("../config/connection");
const { Park, Event } = require("../models");

const parkdata = [
  {
    name: "Bredesen Park",
    location: "5901 Olinger Blvd, Minneapolis, MN 55436",
    activites: ["basketball", "tennis"],
  },
  {
    name: "Countryside",
    location: "Edina, MN 55436",
    activites: "basketball",
  },
];

const seedParks = () => Park.bulkCreate(parkdata, { individualHooks: true });

module.exports = seedParks;
