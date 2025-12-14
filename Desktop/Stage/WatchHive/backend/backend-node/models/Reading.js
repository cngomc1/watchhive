const { DataTypes } = require("sequelize");
const sequelize = require("./database");
const Hive = require("./Hive");

const Reading = sequelize.define("Reading", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    timestamp: DataTypes.DATE,
    rain: DataTypes.FLOAT,
    light: DataTypes.FLOAT,
    temperature_in: DataTypes.FLOAT,
    temperature_out: DataTypes.FLOAT,
    humidity: DataTypes.FLOAT,
    weight: DataTypes.FLOAT
});

Reading.belongsTo(Hive, { foreignKey: "hiveId" });

module.exports = Reading;
