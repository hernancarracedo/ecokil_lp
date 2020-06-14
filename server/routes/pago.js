const express = require('express');
const router = express.Router();

// controlador
const pagoController = require('../controllers/pago');

// Helpers
// const { isAuthenticated } = require('../helpers/auth');
 
//router.post('/cliente/add', isAuthenticated, clienteController.newCliente);
// la linea de arriba queda de ejemplo de como deberia meter el helper para chequear logueo

router.post('/pago/create', pagoController.createPago);
router.get('/pago/', pagoController.getPagos);
router.get('/pago/:id', pagoController.getPago);
router.put('/pago/update/:id', pagoController.updatePago);
router.delete('/pago/delete/:id', pagoController.deletePago);

module.exports = router;