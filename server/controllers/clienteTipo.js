var mysql = require('mysql');
var dbconfig = require('../config/database');
var conex = mysql.createConnection(dbconfig.connection);
conex.query('USE ' + dbconfig.database);

const clienteTipoCtrl = {};

// Get todos los Tipos de Cliente
clienteTipoCtrl.getClienteTipos = async (req, res) => {
  sql = `SELECT id_tipo_cliente, tx_tipo_cliente
         FROM clientes_tipo
         WHERE baja is null`;
    conex.query(await sql, function(error, result, fields){
      if (error) {
          return res.status(404).send("Ha ocurrido un error en la consulta");
      }
      res.json(result)
  });   
}

//Post Nuevo Tipo Cliente
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
/*
async function getCliente(req, res){
    sql = `select id_cliente, tx_cliente, CLI.id_tipo_cliente, tx_tipo_cliente, observaciones, fecha_alta as fecha2, DATE_FORMAT(fecha_alta, '%Y-%m-%d') as fecha_alta 
    FROM cliente AS CLI
    LEFT JOIN cliente_tipo as TIP on TIP.id_tipo_cliente = CLI.id_tipo_cliente
    WHERE id_cliente ='`+req.params.id+`'`;
    conex.query(sql, function(error, result_cliente, fields){
        resultado = result_cliente[0];
        res.json(resultado)
    });
}

async function editCliente(req, res){
    const {tx_cliente, id_tipo_cliente, fecha_alta, observaciones} = req.body;
    console.log ('id :'+req.params.id+'\n');
    console.log ('tx_cliente :'+tx_cliente+'\n');
    console.log ('id_tipo_cliente :'+id_tipo_cliente+'\n');
    console.log ('fecha :'+fecha_alta+'\n');
    console.log ('observaciones :'+observaciones+'\n');
    //console.log("ID Usuario: "+req.user.id);
    
    sql = "UPDATE cliente SET tx_cliente = '"+tx_cliente+"', id_tipo_cliente = '"+id_tipo_cliente+"', fecha_alta = '"+fecha_alta+"', observaciones = '"+observaciones+"', id_usuario = '99' WHERE id_cliente = "+req.params.id;
    
    conex.query(sql, function(error, resultado, fields){
        if (error) {
            console.log("Ha ocurrido un error en la consulta", error.message);
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.status(200).send("Cliente Actualizado");
    });   
}

async function deleteCliente(req, res){
    sql = "UPDATE cliente SET baja = DATE_FORMAT(NOW( ) , '%Y-%m-%d') WHERE id_cliente = "+req.params.id;
    conex.query(sql, function(error, resultado, fields){
        if (error) {
            console.log("Ha ocurrido un error en la consulta", error.message);
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.status(200).send("Se ha eliminado el cliente");
    });
}
*/


module.exports = clienteTipoCtrl;