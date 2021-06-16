const express = require('express');
const router = express.Router();

// controlador
const sucursalController = require('../controllers/sucursal');

// Helpers
// const { isAuthenticated } = require('../helpers/auth');
 
router.post('/sucursal/create', sucursalController.createSucursal);
router.get('/sucursal', sucursalController.getSucursales);
router.get('/sucursal/:id', sucursalController.getSucursal);
router.get('/sucursalcliente/:id', sucursalController.getSucursalesByCliente);
router.put('/sucursal/update/:id', sucursalController.updateSucursal);
router.delete('/sucursal/delete/:id', sucursalController.deleteSucursal);

module.exports = router;