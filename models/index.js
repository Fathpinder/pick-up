//import all models
const User = require("./User");
const Park = require("./Park");
const Event = require("./Event");

// create associations
User.hasMany(Event, {
  foreignKey: "user_id",
});

Event.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.belongsToMany(Park, {
  foreignKey: "user_id",
  through: Event,
});

Park.hasMany(Event, {
  foreignKey: "event_id",
});

Event.hasMany(User, {
  foreignKey: "user_id",
});

module.exports = { User, Park, Event };
