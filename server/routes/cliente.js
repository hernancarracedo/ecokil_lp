const express = require('express');
const router = express.Router();

// controlador
const clienteController = require('../controllers/cliente');

// Helpers
// const { isAuthenticated } = require('../helpers/auth');
 
//router.post('/cliente/add', isAuthenticated, clienteController.newCliente);
router.post('/cliente/create', clienteController.createCliente);

//router.get('/cliente', isAuthenticated, clienteController.getClientes);
//router.get('/cliente', clienteController.getClientes);
router.get('/cliente/', clienteController.getClientes);

//router.get('/cliente/:id', isAuthenticated, clienteController.clienteEditRender);
router.get('/cliente/:id', clienteController.getCliente);

//router.put('/cliente/edit/:id', isAuthenticated, clienteController.editCliente);
router.put('/cliente/update/:id', clienteController.updateCliente);

//router.put('/cliente/delete/:id', isAuthenticated, clienteController.deleteCliente);
router.put('/cliente/delete/:id', clienteController.deleteCliente);

module.exports = router;