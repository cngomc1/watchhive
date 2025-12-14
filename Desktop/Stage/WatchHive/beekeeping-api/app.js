const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { connectDB } = require('./config/db');

// Import Controllers
const AuthCtrl = require('./controllers/authController');
const ApiaryCtrl = require('./controllers/apiaryController');
const HiveCtrl = require('./controllers/hiveController');
const AlertCtrl = require('./controllers/alertController');
const ReadingCtrl = require('./controllers/readingController');
const DashboardCtrl = require('./controllers/dashboardController');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Database Connect
// connectDB();

// --- SWAGGER CONFIG ---
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Beekeeping Smart API', version: '1.0.0', description: 'API for Hive Management with Python processing' },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./app.js'], 
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- ROUTES DEFINITION ---

/**
 * @swagger
 * tags:
 *   name: Auth
 */
app.post('/auth/register', AuthCtrl.register);
app.post('/auth/login', AuthCtrl.login);

/**
 * @swagger
 * tags:
 *   name: Apiaries
 */
app.post('/apiaries', ApiaryCtrl.create);
app.get('/apiaries', ApiaryCtrl.getAll);
app.get('/apiaries/:id', ApiaryCtrl.getOne);
app.put('/apiaries/:id', ApiaryCtrl.update);
app.delete('/apiaries/:id', ApiaryCtrl.delete);
app.get('/apiaries/:id/hives', ApiaryCtrl.getHivesByApiary); // Récup toutes les ruches d'un rucher

/**
 * @swagger
 * tags:
 *   name: Hives
 */
app.post('/hives', HiveCtrl.create);
app.get('/hives', HiveCtrl.getAll);
app.get('/hives/:id', HiveCtrl.getOne);
app.put('/hives/:id', HiveCtrl.update);
app.delete('/hives/:id', HiveCtrl.delete);

/**
 * @swagger
 * tags:
 *   name: Readings
 *   description: Python processing endpoint
 */
/**
 * @swagger
 * /readings:
 *   post:
 *     tags: [Readings]
 *     summary: Send hex data (12 bytes), parse with Python, update Hive, Check Alerts
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
 *                 example: "001A01F40019001C003C0064"
 *               time:
 *                 type: string
 */
app.post('/readings', ReadingCtrl.createReading);

/**
 * @swagger
 * tags:
 *   name: Alerts
 */
app.get('/alerts/check', AlertCtrl.checkAlertsEndpoint);
app.get('/alerts/settings', AlertCtrl.getSettings);
app.put('/alerts/settings', AlertCtrl.updateSettings);
app.get('/alerts', AlertCtrl.getAlertsHistory);
app.post('/alerts/send', AlertCtrl.sendAlert);

/**
 * @swagger
 * tags:
 *   name: Dashboard
 */
app.get('/dashboard', DashboardCtrl.getDashboard);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});