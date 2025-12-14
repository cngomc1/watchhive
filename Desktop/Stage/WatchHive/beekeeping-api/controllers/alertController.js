const { Alert, Settings } = require('../config/db');
const axios = require('axios');

// Helper function to send WhatsApp
const sendToGreenApi = async (phone, message) => {
    const idInstance = process.env.GREEN_API_ID;
    const apiTokenInstance = process.env.GREEN_API_TOKEN;
    const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    try {
        // Le format chatId GreenAPI est "numero@c.us"
        await axios.post(url, { chatId: `${phone}@c.us`, message: message });
        console.log("WhatsApp sent to", phone);
    } catch (error) {
        console.error("Green-API Error:", error.message);
    }
};

exports.getSettings = async (req, res) => {
    const settings = await Settings.findOne();
    res.json(settings || {});
};

exports.updateSettings = async (req, res) => {
    const [settings, created] = await Settings.findOrCreate({ where: {}, defaults: req.body });
    if (!created) await settings.update(req.body);
    res.json({ message: "Settings updated", settings });
};

exports.getAlertsHistory = async (req, res) => {
    const alerts = await Alert.findAll({ order: [['createdAt', 'DESC']] });
    res.json(alerts);
};

exports.sendAlert = async (req, res) => {
    const { phone, message } = req.body;
    await sendToGreenApi(phone, message);
    res.json({ message: "Attempted to send alert" });
};

// Utilisé par ReadingController et la route /alerts/check
exports.checkAlertsLogic = async (hive, metrics) => {
    const settings = await Settings.findOne();
    if (!settings) return null;

    let violations = [];
    if (settings.rain_max && metrics.rain > settings.rain_max) violations.push(`Pluie élevée: ${metrics.rain}`);
    if (settings.temp_in_max && metrics.temperature_in > settings.temp_in_max) violations.push(`Temp Int élevée: ${metrics.temperature_in}`);
    if (settings.weight_min && metrics.weight < settings.weight_min) violations.push(`Poids bas: ${metrics.weight}`);
    // ... Ajoute ici les autres comparaisons (humidity, light, etc)

    if (violations.length > 0) {
        const msg = `ALERTE Ruche ${hive.device}: ` + violations.join(', ');
        // Récupérer un numéro destinataire (ici en dur ou depuis User)
        const receiver = "237600000000"; 
        
        await Alert.create({
            title: "Seuil critique dépassé",
            content: msg,
            receiver: receiver,
            hive_id: hive.id
        });

        // Appel Green-API seulement si seuil dépassé
        await sendToGreenApi(receiver, msg);
        return msg;
    }
    return null;
};

exports.checkAlertsEndpoint = async (req, res) => {
    // Cette route pourrait être appelée pour vérifier globalement tout le parc
    // Pour l'exemple, on renvoie OK car la vérif se fait surtout dans Reading
    res.json({ message: "Vérification manuelle déclenchée (voir logs)" });
};