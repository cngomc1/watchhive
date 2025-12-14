const { DataTypes } = require("sequelize");
const sequelize = require("./database");
const User = require("./User");

const AlertSettings = sequelize.define("AlertSettings", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    minWeight: DataTypes.FLOAT,
    maxTemp: DataTypes.FLOAT,
    minLight: DataTypes.FLOAT,
    maxHumidity: DataTypes.FLOAT
});

AlertSettings.belongsTo(User, { foreignKey: "userId" });

module.exports = AlertSettings;
