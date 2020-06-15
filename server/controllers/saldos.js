var mysql = require('mysql');
var dbconfig = require('../config/database');
var conex = mysql.createConnection(dbconfig.connection);
conex.query('USE ' + dbconfig.database);

const saldosCtrl = {};

// GET - todos los Saldos de Clientes
saldosCtrl.getSaldos = async (req, res) => {
  sql = `SELECT CLI.id_cliente, tx_cliente, SUM(IFNULL(monto,0)) AS saldo 
  FROM cta_cte AS CC
  RIGHT JOIN (SELECT id_cliente, tx_cliente FROM clientes) AS CLI ON CLI.id_cliente = CC.id_cliente
  WHERE CC.baja IS NULL
  GROUP BY CLI.id_cliente`;
    conex.query(await sql, function(error, result, fields){
      if (error) {
          return res.status(404).send("Ha ocurrido un error en la consulta");
      }
      res.json(result)
  });   
}

// GET - Tipo de Cliente por ID
saldosCtrl.getSaldo = async (req, res) => {
  sql = `SELECT IFNULL(SUM(monto),0) as saldo
         FROM cta_cte
         WHERE id_cliente ='`+req.params.id+`'
         AND baja IS NULL`;
    conex.query(await sql, function(error, result, fields){
      if (error) {
          return res.status(404).send("Ha ocurrido un error en la consulta");
      }
      res.json(result[0])
  });   
}

module.exports = saldosCtrl;