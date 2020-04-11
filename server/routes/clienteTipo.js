const express = require('express');
const router = express.Router();

// controlador
const clienteTipoController = require('../controllers/clienteTipo');

// Helpers
// const { isAuthenticated } = require('../helpers/auth');
 
//router.post('/cliente/add', isAuthenticated, clienteController.newCliente);
//router.post('/tipos-cliente/add', clienteTipoController.newCliente);

//router.get('/cliente', isAuthenticated, clienteController.getClientes);
router.get('/tipos-cliente', clienteTipoController.getClienteTipos);

//router.get('/cliente/:id', isAuthenticated, clienteController.clienteEditRender);
//router.get('/tipos-cliente/:id', clienteTipoController.getCliente);

//router.put('/cliente/edit/:id', isAuthenticated, clienteController.editCliente);
//router.put('/tipos-cliente/edit/:id', clienteTipoController.editCliente);

//router.put('/cliente/delete/:id', isAuthenticated, clienteController.deleteCliente);
//router.put('/tipos-cliente/delete/:id', clienteTipoController.deleteCliente);

module.exports = router;