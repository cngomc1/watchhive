const Reading = require('../models/Reading');
const Hive = require('../models/Hive');
const { spawn } = require('child_process');
const path = require('path');

exports.receiveReading = async (req, res) => {
    try {
        const { device, data, time } = req.body;

        // Lancer le script Python
        const pythonScriptPath = path.join(__dirname, '../../data-processor/decoder.py');
        const pythonProcess = spawn('python', [pythonScriptPath, data]);

        let output = '';

        pythonProcess.stdout.on('data', chunk => output += chunk.toString());

        pythonProcess.on('close', async () => {
            const decoded = JSON.parse(output);

            // Trouver la ruche
            const hive = await Hive.findOne({ sigfoxDeviceId: device });
            if (!hive) return res.status(400).json({ error: "Ruche non trouvée" });

            const reading = new Reading({
                hiveId: hive._id,
                timestamp: new Date(time * 1000),
                ...decoded
            });

            await reading.save();

            res.json({ message: "Lecture enregistrée", reading });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
