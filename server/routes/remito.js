const express = require('express');
const router = express.Router();
var multer  = require('multer');
const path = require("path");

// controlador
const remitoController = require('../controllers/remito');

// Helpers
//const { isAuthenticated } = require('../helpers/auth');


const storage = multer.diskStorage({
    destination: "./uploads/remitos",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });

 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("myImage");


//var upload = multer({ dest: 'uploads/remitos/' });




//router.get('/documento/add', isAuthenticated, documentoController.documentoRender);
//router.post('/remito/create', upload.single('myImage'), remitoController.createRemito);
router.post('/remito/create', upload, remitoController.createRemito);
router.get('/remitos', remitoController.getRemitos);
//router.get('/documento/edit/:id', isAuthenticated, documentoController.documentoEditRender);
//router.put('/documento/edit-documento/:id', isAuthenticated, documentoController.documentoEdit);
//router.put('/documento/delete/:id', isAuthenticated, documentoController.documentoDelete);

module.exports = router;