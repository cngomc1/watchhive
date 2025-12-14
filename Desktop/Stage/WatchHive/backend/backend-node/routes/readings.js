const router = require('express').Router();
const { spawn } = require('child_process');
const Reading = require('../models/Reading'); // Ton modèle BDD
const Hive = require('../models/Hive');
const path = require('path');

const checkAlerts = require('../utils/checkAlerts');

/**
 * @swagger
 * tags:
 *   name: Readings
 *   description: Mesures obtenues des capteurs des ruches
 */

/**
 * @swagger
 * /readings:
 *   post:
 *     summary: Enregistrer les mesures des capteurs envoyé par SigFox selon les attributs des ruches
 *     tags: [Readings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device:
 *                 type: string
 *               data:
 *                 type: string
 *               time:
 *                 type: string
 *              
 *     responses:
 *       201:
 *         description: Rucher créé
 */
router.post('/', async (req, res) => {
    const { device, data, time } = req.body; // data est en HEX

    // 1. Appeler le script Python pour décoder
    const pythonScriptPath = path.join(__dirname, '../../data-processor/decoder.py');
    const pythonProcess = spawn('python', [pythonScriptPath, data]);

    let decodedData = '';

    // Réception des données du script Python
    pythonProcess.stdout.on('data', (chunk) => {
        decodedData += chunk.toString();
    });

    // Fin de l'exécution du script Python
    pythonProcess.on('close', async (code) => {
        if (code !== 0) {
            return res.status(500).json({ error: "Erreur décodage Python" });
        }

        try {
            // 2. Conversion du résultat Python (String) en Objet JS
            const sensors = JSON.parse(decodedData);

            if (sensors.error) {
                return res.status(400).json({ error: sensors.error });
            }

            // 3. Sauvegarde en Base de Données
            // On cherche la ruche associée au device ID Sigfox
            const hive = await Hive.findOne({ sigfoxDeviceId: device });
            
            const newReading = new Reading({
                hiveId: hive ? hive._id : null,
                timestamp: new Date(time * 1000), // Sigfox envoie un timestamp UNIX
                ...sensors // spread: rain, light, temperature_in, etc.
            });

            await newReading.save();

            // 4. Déclenchement automatique de la vérification des alertes
            // (Tu peux appeler ta fonction checkAlerts ici directement)
            
            await checkAlerts(newReading);
            // checkAlerts(newReading); 

            res.status(201).json({ message: "Lecture enregistrée", data: sensors });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur serveur interne" });
        }
    });
});

module.exports = router;