const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Park extends Model {}

Park.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   isAddress: true
      // }
    },
    activities: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "park",
  }
);

module.exports = Park;
