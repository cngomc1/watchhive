const express = require('express');
const router = express.Router();
const { Apiary } = require('../models/Apiary');

/**
 * @swagger
 * tags:
 *   name: Apiaries
 *   description: Gestion des ruchers
 */

/**
 * @swagger
 * /api/apiaries:
 *   get:
 *     summary: Récupère tous les ruchers
 *     tags: [Apiaries]
 *     responses:
 *       200:
 *         description: Liste des ruchers
 */
router.get('/', async (req, res) => {
  const apiaries = await Apiary.findAll();
  res.json(apiaries);
});

/**
 * @swagger
 * /api/apiaries:
 *   post:
 *     summary: Crée un nouveau rucher
 *     tags: [Apiaries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rucher créé
 */
router.post('/', async (req, res) => {
  const apiary = await Apiary.create(req.body);
  res.status(201).json(apiary);
});

module.exports = router;
