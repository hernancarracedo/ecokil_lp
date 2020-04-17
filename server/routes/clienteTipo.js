const express = require('express');
const router = express.Router();

// controlador
const clienteTipoController = require('../controllers/clienteTipo');

// Helpers
// const { isAuthenticated } = require('../helpers/auth');
 
router.post('/clientetipo/create', clienteTipoController.createClienteTipo);
router.get('/clientetipo', clienteTipoController.getClienteTipos);
//router.get('/clientetipo/:id', clienteTipoController.getClienteTipo);
//router.put('/clientetipo/update/:id', clienteTipoController.updateClienteTipo);
//router.delete('/clientetipo/delete/:id', clienteTipoController.deleteClienteTipo);

module.exports = router;