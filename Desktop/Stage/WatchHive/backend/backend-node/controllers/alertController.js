const AlertSettings = require('../models/AlertSettings');
const Reading = require('../models/Reading');

exports.getSettings = async (req, res) => {
    const settings = await AlertSettings.findOne({ userId: req.user.id });
    res.json(settings);
};

exports.updateSettings = async (req, res) => {
    const updated = await AlertSettings.findOneAndUpdate(
        { userId: req.user.id },
        { ...req.body },
        { new: true, upsert: true }
    );
    res.json(updated);
};

exports.checkReading = async (req, res) => {
    try {
        const { readingId } = req.body;

        const reading = await Reading.findById(readingId);
        const settings = await AlertSettings.findOne({ userId: req.user.id });

        const alerts = [];

        if (reading.weight < settings.minWeight)
            alerts.push(`Poids trop faible: ${reading.weight}g`);

        if (reading.temperature_in > settings.maxTemp)
            alerts.push(`Température interne trop élevée: ${reading.temperature_in}°C`);

        if (reading.humidity > settings.maxHumidity)
            alerts.push(`Humidité trop élevée: ${reading.humidity}%`);

        res.json({ alerts });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
