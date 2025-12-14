const { Apiary, Hive } = require('../config/db');

exports.getDashboard = async (req, res) => {
    try {
        const apiaryCount = await Apiary.count();
        const hiveCount = await Hive.count();
        
        // Récupérer localisation pour la carte
        const locations = await Apiary.findAll({
            attributes: ['id', 'name', 'location']
        });

        res.json({
            stats: {
                total_apiaries: apiaryCount,
                total_hives: hiveCount
            },
            map_data: locations
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};