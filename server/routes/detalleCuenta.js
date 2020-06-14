const express = require('express');
const router = express.Router();

// controlador
const detalleCuentaController = require('../controllers/detalleCuenta');

// Helpers
// const { isAuthenticated } = require('../helpers/auth');
 
router.get('/detalleCuenta/:id', detalleCuentaController.getDetalleCuenta);


module.exports = router;