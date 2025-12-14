const { DataTypes } = require("sequelize");
const sequelize = require("./database");
const User = require("./User");

const Apiary = sequelize.define("Apiary", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    location: DataTypes.STRING
});

Apiary.belongsTo(User, { foreignKey: "ownerId" });

module.exports = Apiary;
