const { Apiary, Hive } = require('../config/db');

exports.create = async (req, res) => {
    try {
        const apiary = await Apiary.create(req.body);
        res.status(201).json(apiary);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getAll = async (req, res) => {
    try {
        const apiaries = await Apiary.findAll();
        res.json(apiaries);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getOne = async (req, res) => {
    try {
        const apiary = await Apiary.findByPk(req.params.id);
        if (!apiary) return res.status(404).json({ error: "Not found" });
        res.json(apiary);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.update = async (req, res) => {
    try {
        await Apiary.update(req.body, { where: { id: req.params.id } });
        res.json({ message: "Apiary updated" });
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.delete = async (req, res) => {
    try {
        await Apiary.destroy({ where: { id: req.params.id } });
        res.json({ message: "Apiary deleted" });
    } catch (e) { res.status(500).json({ error: e.message }); }
};

// Route spécifique : Récupérer toutes les ruches d'un rucher
exports.getHivesByApiary = async (req, res) => {
    try {
        const hives = await Hive.findAll({ where: { apiary_id: req.params.id } });
        res.json(hives);
    } catch (e) { res.status(500).json({ error: e.message }); }
};