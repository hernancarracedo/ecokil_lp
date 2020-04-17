var mysql = require('mysql');
var dbconfig = require('../config/database');
var conex = mysql.createConnection(dbconfig.connection);
conex.query('USE ' + dbconfig.database);

const clienteCtrl = {};

//
clienteCtrl.getClientes = async (req, res) => {
    sql = `SELECT id_cliente, tx_cliente, tx_tipo_cliente, observaciones, fecha_alta as fecha2, DATE_FORMAT(fecha_alta, '%d/%m/%Y') as fecha_alta
           FROM clientes AS CLI
           LEFT JOIN clientes_tipo as TIP on TIP.id_tipo_cliente = CLI.id_tipo_cliente
           WHERE CLI.baja is null`;
    console.log("la consulta es: "+sql)
    conex.query(await sql, function(error, result, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.json(result)
    });   
}

//  
clienteCtrl.createCliente = async (req, res) => {
    const { tx_cliente, id_tipo_cliente, razon_social, cuit, domicilio, fecha_alta, observaciones } = req.body;
    sql = "INSERT INTO clientes (`tx_cliente`, `id_tipo_cliente`, `razon_social`, `cuit`, `domicilio`, `fecha_alta`, `observaciones`, `id_usuario`) VALUES ('" + tx_cliente + "','" + id_tipo_cliente + "', '" + razon_social + "', '" + cuit + "', '" + domicilio + "', '" + fecha_alta + "', '" + observaciones + "', '88')";
    console.log(sql)
    conex.query(await sql, function(error, resultado, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta:" + error.message);
        }
        res.status(200).send("Nuevo Cliente Agregado Correctamente");
    });
};

//
clienteCtrl.getCliente = async (req, res) => {
    sql = "SELECT * FROM clientes WHERE id_cliente = '"+req.params.id+"'";
    //console.log("la consulta es: "+sql)
    conex.query(await sql, function(error, result, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.json(result[0])
    });   
  }

//
clienteCtrl.updateCliente = async (req, res) => {
    const { id_cliente, tx_cliente, id_tipo_cliente, razon_social, cuit, domicilio, fecha_alta, observaciones } = req.body;    
    //console.log ("Update Query: "+req.body)
    sql = "UPDATE clientes SET tx_cliente = '"+tx_cliente+"', id_tipo_cliente = '"+id_tipo_cliente+"', razon_social = "+razon_social+", cuit = "+cuit+", domicilio = '"+domicilio+"', fecha_alta = '"+fecha_alta+"', observaciones = '"+observaciones+"', id_usuario = '99' WHERE id_cliente = "+req.params.id;
    //console.log ("Update Query: "+sql)
    conex.query(await sql, function(error, resultado, fields){
        if (error) {
            console.log("Ha ocurrido un error en la consulta", error.message);
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.status(200).send("Cliente Actualizado");
    });  
}

//
clienteCtrl.deleteCliente = async (req, res) => {
    sql = "UPDATE clientes SET baja = DATE_FORMAT(NOW( ) , '%Y-%m-%d') WHERE id_cliente = "+req.params.id;
    conex.query(await sql, function(error, resultado, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.status(200).send("Se ha eliminado el cliente");
    });
}

module.exports = clienteCtrl;