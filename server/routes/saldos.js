const express = require('express');
const router = express.Router();

// controlador
const saldosController = require('../controllers/saldos');

// Helpers
// const { isAuthenticated } = require('../helpers/auth');
 
router.get('/saldos', saldosController.getSaldos);
router.get('/saldo/:id', saldosController.getSaldo);

module.exports = router;