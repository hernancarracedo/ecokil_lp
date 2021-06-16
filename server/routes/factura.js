const express = require('express');
const router = express.Router();

// controlador
const facturaController = require('../controllers/factura');

// Helpers
// const { isAuthenticated } = require('../helpers/auth');
 
//router.post('/cliente/add', isAuthenticated, clienteController.newCliente);
// la linea de arriba queda de ejemplo de como deberia meter el helper para chequear logueo

router.post('/factura/create', facturaController.createFactura);
router.get('/factura/', facturaController.getFacturas);
router.get('/factura/:id', facturaController.getFactura);
router.put('/factura/update/:id', facturaController.updateFactura);
router.delete('/factura/delete/:id', facturaController.deleteFactura);



module.exports = router;