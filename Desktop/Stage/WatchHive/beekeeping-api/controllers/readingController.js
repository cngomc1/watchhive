const { spawn } = require('child_process');
const { Reading, Hive } = require('../config/db');
const { checkAlertsLogic } = require('./alertController');

const callPythonParser = (hexData) => {
    return new Promise((resolve, reject) => {
        const py = spawn('python3', ['./scripts/parser.py', hexData]);
        let dataStr = '';
        
        py.stdout.on('data', (data) => { dataStr += data.toString(); });
        py.stderr.on('data', (data) => { console.error(`PY Error: ${data}`); });
        
        py.on('close', (code) => {
            try {
                const json = JSON.parse(dataStr);
                if (json.error) reject(new Error(json.error));
                else resolve(json);
            } catch (e) { reject(e); }
        });
    });
};

exports.createReading = async (req, res) => {
    try {
        const { device, data, time } = req.body;

        // 1. Sauvegarde brut
        await Reading.create({ device, data, time });

        // 2. Traitement Python
        const metrics = await callPythonParser(data);

        // 3. Mise à jour de la Ruche
        let hive = await Hive.findOne({ where: { device } });
        
        if (hive) {
            await hive.update(metrics);
            
            // 4. Vérification Alertes (Appel logique alertController)
            const alertResult = await checkAlertsLogic(hive, metrics);
            
            res.status(201).json({ 
                message: "Reading processed", 
                metrics, 
                alert: alertResult ? "Alert triggered" : "No alert" 
            });
        } else {
            res.status(404).json({ error: "Hive device not found, cannot attach reading" });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};