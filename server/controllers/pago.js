var mysql = require('mysql');
var dbconfig = require('../config/database');
var conex = mysql.createConnection(dbconfig.connection);
conex.query('USE ' + dbconfig.database);

const pagoCtrl = {};

//
pagoCtrl.getPagos = async (req, res) => {
    sql = `SELECT id, FAC.id_cliente, tx_cliente, tipo_doc, monto, factura, cheque, FAC.observaciones, FAC.fecha_alta as fecha2, DATE_FORMAT(FAC.fecha_alta, '%d/%m/%Y') as fecha_alta
           FROM cta_cte AS FAC
           LEFT JOIN clientes as CLI on CLI.id_cliente = FAC.id_cliente
           WHERE FAC.tipo_doc = 'RC' 
           AND FAC.baja is null`;
    conex.query(await sql, function(error, result, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.json(result)
    });   
}

//  
pagoCtrl.createPago = async (req, res) => {
    const { id_cliente, monto, cheque, fecha_alta, observaciones } = req.body;
    console.log('la fecha que llega es: '+ fecha_alta);
    sql = "INSERT INTO cta_cte (`id_cliente`, `tipo_doc`, `monto`, `cheque`, `fecha_alta`, `observaciones`) VALUES ('" + id_cliente + "','RC', '" + monto + "', '" + cheque + "', '" + fecha_alta + "', '" + observaciones + "')";
    conex.query(await sql, function(error, resultado, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta:" + error.message);
        }
        res.status(200).send("Nuevo Pago Agregado Correctamente");
    });
};

//
pagoCtrl.getPago = async (req, res) => {
    sql = "SELECT * FROM cta_cte WHERE id = '"+req.params.id+"'";
    conex.query(await sql, function(error, result, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.json(result[0])
    });   
}

//
pagoCtrl.updatePago = async (req, res) => {
    const { id_cliente, cheque, monto, fecha_alta, observaciones } = req.body;    
    
    sql = "UPDATE cta_cte SET id_cliente = "+id_cliente+", cheque = '"+cheque+"', monto = '"+monto+"', fecha_alta = '"+fecha_alta+"', observaciones = '"+observaciones+"' WHERE id = "+req.params.id;
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
pagoCtrl.deletePago = async (req, res) => {
    sql = "UPDATE cta_cte SET baja = DATE_FORMAT(NOW( ) , '%Y-%m-%d') WHERE id = "+req.params.id;
    conex.query(await sql, function(error, resultado, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta");
        }
        res.status(200).send("Se ha eliminado la factura");
    });
}

module.exports = pagoCtrl;