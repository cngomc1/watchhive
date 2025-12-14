const AlertSettings = require('../models/AlertSettings');

module.exports = async function(reading) {
    const settings = await AlertSettings.findOne({ userId: reading.hiveId.ownerId });

    const alerts = [];

    if (reading.weight < settings.minWeight) {
        alerts.push("Poids trop faible");
    }

    if (reading.temperature_in > settings.maxTemp) {
        alerts.push("Température interne trop élevée");
    }

    if (alerts.length > 0) {
        console.log("⚠️ Alerte pour la ruche", reading.hiveId, alerts);
        // appel GreenAPI pour envoyer WhatsApp
    }
};
