const express = require('express');
const router = express.Router();

// controlador
const referenciasController = require('../controllers/referencias');

// Helpers
// const { isAuthenticated } = require('../helpers/auth');
 
//router.post('/cliente/add', isAuthenticated, clienteController.newCliente);
// la linea de arriba queda de ejemplo de como deberia meter el helper para chequear logueo

//router.post('/cliente/create', clienteController.createCliente);
router.get('/referencias/', referenciasController.getReferencias);
//router.get('/cliente/:id', clienteController.getCliente);
//router.put('/cliente/update/:id', clienteController.updateCliente);
//router.delete('/cliente/delete/:id', clienteController.deleteCliente);

module.exports = router;