var mysql = require('mysql');
var dbconfig = require('../config/database');
var conex = mysql.createConnection(dbconfig.connection);
conex.query('USE ' + dbconfig.database);

const sucursalCtrl = {};

//
sucursalCtrl.getSucursales = async (req, res) => {
    sql = `SELECT id_sucursal, tx_sucursal, tx_cliente, SUC.domicilio, SUC.observaciones, fecha_desde as fecha_desde2, DATE_FORMAT(fecha_desde, '%d/%m/%Y') as fecha_desde
           FROM sucursales AS SUC
           LEFT JOIN clientes as CLI on CLI.id_cliente = SUC.id_cliente
           WHERE SUC.fecha_hasta is null`;
    conex.query(await sql, function(error, result, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.json(result)
    });   
}

//  
sucursalCtrl.createSucursal = async (req, res) => {
    const { tx_sucursal, id_cliente, domicilio, observaciones } = req.body;
    sql = "INSERT INTO sucursales (`tx_sucursal`, `id_cliente`, `domicilio`, `observaciones`, `fecha_desde`, `id_usuario`) VALUES ('" + tx_sucursal + "','" + id_cliente + "', '" + domicilio + "', '" + observaciones + "',  DATE_FORMAT(NOW( ) , '%Y-%m-%d') , '88')";
    conex.query(await sql, function(error, result, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta:" + error.message);
        }
        res.status(200).send("Nueva Sucursal Agregada Correctamente");
    });
};

//
sucursalCtrl.getSucursal = async (req, res) => {
    sql = "SELECT * FROM sucursales WHERE id_sucursal = '"+req.params.id+"'";
    conex.query(await sql, function(error, result, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.json(result[0])
    });   
  }

//
sucursalCtrl.updateSucursal = async (req, res) => {
    const { tx_sucursal, id_cliente, domicilio, observaciones, fecha_desde } = req.body;    
    sql = "UPDATE sucursal SET tx_sucursal = '"+tx_sucursal+"', id_cliente = '"+id_cliente+"', domicilio = "+domicilio+", observaciones = "+observaciones+", fecha_desde = '"+fecha_desde+"', id_usuario = '99' WHERE id_sucural = "+req.params.id;
    conex.query(await sql, function(error, result, fields){
        if (error) {
            console.log("Ha ocurrido un error en la consulta", error.message);
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.status(200).send("Sucursal actualizado");
    });  
}

//
sucursalCtrl.deleteSucursal = async (req, res) => {
    sql = "UPDATE sucursales SET fecha_hasta = DATE_FORMAT(NOW( ) , '%Y-%m-%d') WHERE id_sucursal = "+req.params.id;
    conex.query(await sql, function(error, result, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.status(200).send("Se ha eliminado la sucursal del cliente");
    });
}

module.exports = sucursalCtrl;