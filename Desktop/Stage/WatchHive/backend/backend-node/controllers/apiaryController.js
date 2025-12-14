const Apiary = require('../models/Apiary');

exports.createApiary = async (req, res) => {
    try {
        const { name, location } = req.body;

        const apiary = new Apiary({
            name,
            location,
            ownerId: req.user.id
        });

        await apiary.save();

        res.status(201).json(apiary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserApiaries = async (req, res) => {
    try {
        const apiaries = await Apiary.find({ ownerId: req.user.id });
        res.json(apiaries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
