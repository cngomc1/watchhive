const { DataTypes } = require("sequelize");
const sequelize = require("./database");
const Apiary = require("./Apiary");

const Hive = sequelize.define("Hive", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    sigfoxDeviceId: { type: DataTypes.STRING, unique: true }
});

Hive.belongsTo(Apiary, { foreignKey: "apiaryId" });

module.exports = Hive;
