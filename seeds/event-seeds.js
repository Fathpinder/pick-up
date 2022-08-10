const sequelize = require("../config/connection");
const { Event } = require("../models");

const eventdata = [
  {
    title: "basketball",
    park_id: 1,
    user_id: 1,
    description: "bredesen park Saturday @ 10am",
  },
  {
    title: "tennis",
    park_id: 1,
    user_id: 2,
    description: "countryside park sunday @ 11am",
  },
];

const seedEvents = () => Event.bulkCreate(eventdata, { individualHooks: true });

module.exports = seedEvents;
