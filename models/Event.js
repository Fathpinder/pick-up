const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// create our Event model
class Event extends Model {}

// create fields/columns for Event model
Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //location of park referenced by ID
    park_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "park",
        key: "id",
      },
      // validate: {
      //   isinPark: true,
      // },
    },
    //added to this list by RVSP
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "event",
  }
);

module.exports = Event;
