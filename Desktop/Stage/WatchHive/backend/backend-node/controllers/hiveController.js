const Hive = require('../models/Hive');

exports.createHive = async (req, res) => {
    try {
        const { name, sigfoxDeviceId, apiaryId } = req.body;

        const hive = new Hive({
            name,
            sigfoxDeviceId,
            apiaryId
        });

        await hive.save();
        res.status(201).json(hive);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getApiaryHives = async (req, res) => {
    try {
        const { apiaryId } = req.params;
        const hives = await Hive.find({ apiaryId });
        res.json(hives);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
