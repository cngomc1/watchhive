const router = require('express').Router();
const Hive = require('../models/Hive');

router.post('/', async (req, res) => {
    const { name, sigfoxDeviceId, apiaryId } = req.body;

    const hive = new Hive({
        name,
        sigfoxDeviceId,
        apiaryId
    });

    await hive.save();

    res.status(201).json({ message: "Ruche ajoutée", hive });
});

module.exports = router;
