const express = require('express');
const router = express.Router();

// controlador
const saldosController = require('../controllers/saldos');

// Helpers
// const { isAuthenticated } = require('../helpers/auth');
 
router.get('/saldos', saldosController.getSaldos);


module.exports = router;