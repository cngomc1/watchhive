const { Hive, Apiary } = require('../config/db');

exports.create = async (req, res) => {
    try {
        const hive = await Hive.create(req.body);
        // Mise à jour compteur rucher
        if (hive.apiary_id) {
            const apiary = await Apiary.findByPk(hive.apiary_id);
            if (apiary) apiary.increment('num_hives');
        }
        res.status(201).json(hive);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getAll = async (req, res) => {
    try {
        const hives = await Hive.findAll();
        res.json(hives);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getOne = async (req, res) => {
    try {
        const hive = await Hive.findByPk(req.params.id);
        if (!hive) return res.status(404).json({ error: "Not found" });
        res.json(hive);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.update = async (req, res) => {
    try {
        await Hive.update(req.body, { where: { id: req.params.id } });
        res.json({ message: "Hive updated" });
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.delete = async (req, res) => {
    try {
        const hive = await Hive.findByPk(req.params.id);
        if (hive && hive.apiary_id) {
            const apiary = await Apiary.findByPk(hive.apiary_id);
            if (apiary) apiary.decrement('num_hives');
        }
        await Hive.destroy({ where: { id: req.params.id } });
        res.json({ message: "Hive deleted" });
    } catch (e) { res.status(500).json({ error: e.message }); }
};