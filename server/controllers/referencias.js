var mysql = require('mysql');
var dbconfig = require('../config/database');
var conex = mysql.createConnection(dbconfig.connection);
conex.query('USE ' + dbconfig.database);

const referenciasCtrl = {};

// GET - todas las referencias de lo que se puede encontrar al monitorear cebaderas
referenciasCtrl.getReferencias = async (req, res) => {
  sql = `SELECT id_referencia, tx_referencia
         FROM dispositivos_cebaderas_ref
         WHERE fecha_baja is null`;

    conex.query(await sql, function(error, result, fields){
      if (error) {
          return res.status(404).send("Ha ocurrido un error en la consulta");
      }
      res.json(result)
  });   
}
/*
//POST - Nuevo Tipo Cliente
clienteTipoCtrl.createClienteTipo = async (req, res) => {    
    const {tx_tipo_cliente} = req.body;
    sql = `INSERT INTO clientes_tipo 
        (tx_tipo_cliente) 
        VALUES 
        ('`+tx_tipo_cliente+`')`;

    conex.query(await sql, function(error, result, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta:" + error.message);
        }
        res.status(200).send("Nuevo Tipo de Cliente Agregado Correctamente");
      });
}

// GET - Tipo de Cliente por ID
clienteTipoCtrl.getClienteTipo = async (req, res) => {
    sql = `SELECT *
           FROM clientes_tipo
           WHERE id_tipo_cliente ='`+req.params.id+`'`;
      conex.query(await sql, function(error, result, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.json(result[0])
    });   
  }

// PUT - Actualizacion de cliente
clienteTipoCtrl.updateClienteTipo = async (req, res) => {
    const {tx_tipo_cliente} = req.body;
    sql = "UPDATE clientes_tipo SET tx_tipo_cliente = '"+tx_tipo_cliente+"' WHERE id_tipo_cliente = "+req.params.id;
    conex.query(sql, function(error, resultado, fields){
        if (error) {
            console.log("Ha ocurrido un error en la consulta", error.message);
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.status(200).send("Tipo Cliente Actualizado");
    });   
}

// DELETE - Baja logica del tipo de cliente
clienteTipoCtrl.deleteClienteTipo = async (req, res) => {
    sql = `UPDATE clientes_tipo 
           SET baja = DATE_FORMAT(NOW( ) , '%Y-%m-%d') 
           WHERE id_tipo_cliente = `+req.params.id;

    conex.query(sql, function(error, resultado, fields){
        if (error) {
            console.log("Ha ocurrido un error en la consulta", error.message);
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.status(200).send("Se ha eliminado el tipo cliente");
    });
}
*/
module.exports = referenciasCtrl;