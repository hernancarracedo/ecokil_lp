var mysql = require('mysql');
var dbconfig = require('../config/database');
var conex = mysql.createConnection(dbconfig.connection);
conex.query('USE ' + dbconfig.database);

const detalleCuentaCtrl = {};

// GET - todos los Saldos de Clientes
detalleCuentaCtrl.getDetalleCuenta = async (req, res) => {
  sql = `SELECT id, CLI.id_cliente, tx_cliente, tipo_doc, monto, factura, cheque, CC.fecha_alta as fecha2, DATE_FORMAT(CC.fecha_alta, '%d/%m/%Y') as fecha_alta
  FROM cta_cte AS CC
  LEFT JOIN clientes AS CLI ON CLI.id_cliente = CC.id_cliente
  WHERE CC.baja IS NULL
  AND CC.id_cliente = '`+req.params.id+`'`;
    conex.query(await sql, function(error, result, fields){
      if (error) {
          return res.status(404).send("Ha ocurrido un error en la consulta");
      }
      res.json(result)
  });   
}

module.exports = detalleCuentaCtrl;