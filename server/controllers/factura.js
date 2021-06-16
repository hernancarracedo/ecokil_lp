var mysql = require('mysql');
var dbconfig = require('../config/database');
var conex = mysql.createConnection(dbconfig.connection);
conex.query('USE ' + dbconfig.database);

const facturaCtrl = {};

//
facturaCtrl.getFacturas = async (req, res) => {
    sql = `SELECT id, FAC.id_cliente, tx_cliente, tipo_doc, monto, factura, cheque, FAC.observaciones, FAC.fecha_alta as fecha2, DATE_FORMAT(FAC.fecha_alta, '%d/%m/%Y') as fecha_alta
           FROM cta_cte AS FAC
           LEFT JOIN clientes as CLI on CLI.id_cliente = FAC.id_cliente
           WHERE FAC.tipo_doc = 'FC' 
           AND FAC.baja is null`;
    conex.query(await sql, function(error, result, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.json(result)
    });   
}


//  
facturaCtrl.createFactura = async (req, res) => {
    const { id_cliente, monto, factura, fecha_alta, observaciones } = req.body;
    sql = "INSERT INTO cta_cte (`id_cliente`, `tipo_doc`, `monto`, `factura`, `fecha_alta`, `observaciones`) VALUES ('" + id_cliente + "','FC', '" + monto + "', '" + factura + "', '" + fecha_alta + "', '" + observaciones + "')";
    console.log("la consulta queda: " + sql);
    conex.query(await sql, function(error, resultado, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta:" + error.message);
        }
        res.status(200).send("Nueva Factura Agregado Correctamente");
    });
};

//
facturaCtrl.getFactura = async (req, res) => {
    sql = "SELECT * FROM cta_cte WHERE id = '"+req.params.id+"'";
    conex.query(await sql, function(error, result, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.json(result[0])
    });   
}

//
facturaCtrl.updateFactura = async (req, res) => {
    const { id_cliente, factura, monto, fecha_alta, observaciones } = req.body;    
    
    sql = "UPDATE cta_cte SET id_cliente = "+id_cliente+", factura = '"+factura+"', monto = '"+monto+"', fecha_alta = '"+fecha_alta+"', observaciones = '"+observaciones+"' WHERE id = "+req.params.id;
    console.log("la consulta es: " + sql)
    conex.query(await sql, function(error, resultado, fields){
        if (error) {
            console.log("Ha ocurrido un error en la consulta", error.message);
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.status(200).send("Factura Actualizada");
    });  
}

//
facturaCtrl.deleteFactura = async (req, res) => {
    sql = "UPDATE cta_cte SET baja = DATE_FORMAT(NOW( ) , '%Y-%m-%d') WHERE id = "+req.params.id;
    conex.query(await sql, function(error, resultado, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.status(200).send("Se ha eliminado la factura");
    });
}

module.exports = facturaCtrl;