// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("WatchHive API running");
// });

// app.listen(3000, () => {
//   console.log("API running on port 3000");
// });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');

const sequelize = require('./models/database');
require('./models/User');
require('./models/Apiary');
require('./models/Hive');
require('./models/Reading');
require('./models/AlertSettings');



const app = express();

app.use(cors());
app.use(express.json());

require("./swagger")(app);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/apiaries', require('./routes/apiaries'));
app.use('/api/hives', require('./routes/hives'));
app.use('/api/readings', require('./routes/readings'));
app.use('/api/alerts', require('./routes/alerts'));

app.get('/', (req, res) => {
    res.send("🐝 API Bee Monitoring (PostgreSQL) opérationnelle !");
});

// Synchronisation BDD
sequelize.sync({ alter: true })
    .then(() => console.log("🗃️ Modèles synchronisés avec PostgreSQL"))
    .catch(err => console.error("❌ Sync error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    console.table(listEndpoints(app));
});
