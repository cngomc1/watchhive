const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    logging: false
});

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
});

const Apiary = sequelize.define('Apiary', {
    name: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING }, // Format "lat,lng" ou adresse
    num_hives: { type: DataTypes.INTEGER, defaultValue: 0 }
});

const Hive = sequelize.define('Hive', {
    device: { type: DataTypes.STRING, unique: true }, // Lien avec Reading
    location: { type: DataTypes.STRING },
    rain: { type: DataTypes.FLOAT },
    light: { type: DataTypes.FLOAT },
    temperature_in: { type: DataTypes.FLOAT },
    temperature_out: { type: DataTypes.FLOAT },
    humidity: { type: DataTypes.FLOAT },
    weight: { type: DataTypes.FLOAT }
});

const Reading = sequelize.define('Reading', {
    device: { type: DataTypes.STRING },
    data: { type: DataTypes.STRING }, // Hex string
    time: { type: DataTypes.STRING }
});

const Alert = sequelize.define('Alert', {
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    receiver: { type: DataTypes.STRING },
    time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

const Settings = sequelize.define('Settings', {
    rain_max: { type: DataTypes.FLOAT },
    light_min: { type: DataTypes.FLOAT },
    light_max: { type: DataTypes.FLOAT },
    temp_in_min: { type: DataTypes.FLOAT },
    temp_in_max: { type: DataTypes.FLOAT },
    temp_out_min: { type: DataTypes.FLOAT },
    temp_out_max: { type: DataTypes.FLOAT },
    humidity_min: { type: DataTypes.FLOAT },
    humidity_max: { type: DataTypes.FLOAT },
    weight_min: { type: DataTypes.FLOAT },
    weight_max: { type: DataTypes.FLOAT }
});

// Relations
Apiary.hasMany(Hive, { foreignKey: 'apiary_id' });
Hive.belongsTo(Apiary, { foreignKey: 'apiary_id' });

Hive.hasMany(Alert, { foreignKey: 'hive_id' });
Alert.belongsTo(Hive, { foreignKey: 'hive_id' });

Hive.hasMany(Reading, { foreignKey: 'hive_id' });
Reading.belongsTo(Hive, { foreignKey: 'hive_id' });

// Sync DB
sequelize.sync({ alter: true }).then(() => console.log("PostgreSQL Synced"));

module.exports = { sequelize, User, Apiary, Hive, Reading, Alert, Settings };