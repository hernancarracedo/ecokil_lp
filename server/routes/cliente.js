const express = require('express');
const router = express.Router();
/*
const { getClientes, createCliente, getCliente, deleteCliente, updateCliente } = require('../controllers/cliente');

router.route('/')
    .get(getClientes)
    .post(createCliente);

router.route('/:id')
    .get(getCliente)
    .put(deleteCliente)
    .put(updateCliente);

module.exports = router;

*/

// controlador
const clienteController = require('../controllers/cliente');

// Helpers
// const { isAuthenticated } = require('../helpers/auth');
 
//router.post('/cliente/add', isAuthenticated, clienteController.newCliente);
router.post('/cliente/add', clienteController.createCliente);

//router.get('/cliente', isAuthenticated, clienteController.getClientes);
//router.get('/cliente', clienteController.getClientes);
router.get('/getClientes', clienteController.getClientes);

//router.get('/cliente/:id', isAuthenticated, clienteController.clienteEditRender);
router.get('/cliente/:id', clienteController.getCliente);

//router.put('/cliente/edit/:id', isAuthenticated, clienteController.editCliente);
router.put('/cliente/edit/:id', clienteController.updateCliente);

//router.put('/cliente/delete/:id', isAuthenticated, clienteController.deleteCliente);
router.put('/cliente/delete/:id', clienteController.deleteCliente);

module.exports = router;