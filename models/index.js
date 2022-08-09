//import all models
const User = require('./User');
const Park = require('./Park');
const Event = require('./Event');
const RSVP = require('./RSVP');

// create associations
User.hasMany(Event, {
  foreignKey: 'user_id'
});

Event.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Park.hasMany(Event, {
    foreignKey: 'user_id'
});

module.exports = { User, Park, Event};
