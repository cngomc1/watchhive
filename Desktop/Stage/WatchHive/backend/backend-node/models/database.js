const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: false
    }
);

sequelize.authenticate()
    .then(() => console.log("🐘 PostgreSQL connecté"))
    .catch(err => console.error("❌ Erreur connexion PostgreSQL :", err));

module.exports = sequelize;
