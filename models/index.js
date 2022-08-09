//import all models
const User = require('./User');
const Park = require('./Park');
const Event = require('./Event');
//const RSVP = require('./RSVP');

// create associations
User.hasMany(Event, {
  foreignKey: 'user_id'
});

Event.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// Event.hasMany(User, { 
//   //through: RSVP,
//   foreignKey: 'event_id'
// });

Park.hasMany(Event, {
    foreignKey: 'park_id'
});

Event.belongsTo(Park, {
  foreignKey: 'park_id'
});


module.exports = { User, Park, Event};
