const router = require('express').Router();
const AlertSettings = require('../models/AlertSettings');

/**
 * @swagger
 * tags:
 *   name: Alerts 
 *   description: Gestion des alertes
 */


// GET les paramètres
router.get('/settings', async (req, res) => {
    const settings = await AlertSettings.findOne({ userId: req.user.id });
    res.json(settings);
});

// UPDATE les paramètres
router.put('/settings', async (req, res) => {
    const userId = req.user.id;

    const updated = await AlertSettings.findOneAndUpdate(
        { userId },
        { ...req.body },  // ex: { minWeight: 1200 }
        { new: true, upsert: true }
    );

    res.json({ message: "Paramètres mis à jour", updated });
});

module.exports = router;
