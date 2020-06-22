var mysql = require('mysql');
var dateformat = require('dateformat');
var dbconfig = require('../config/database');
var conex = mysql.createConnection(dbconfig.connection);
conex.query('USE ' + dbconfig.database);

const remitoCtrl = {};

//

/*
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
*/

//  
remitoCtrl.createRemito = async (req, res) => {
    const { id_cliente, nro_remito, descripcion, fecha, factura, observaciones } = req.body;
    const file = req.file;

    //const fechaB = new Date(fecha);
    //const dia = fechaB.getDate()
    //const mes = fechaB.getMonth()+1
    //const anio = fechaB.getFullYear()
    //const fechaC = new Date(anio+"-"+mes+"-"+dia);

    var fecha_remito = dateformat(new Date(fecha), "yyyy-mm-dd")

    sql = `INSERT INTO remitos (fecha, nro_remito, id_cliente, descripcion, factura, observacines, file_name) VALUES ('`+fecha_remito+`', '`+nro_remito+`', '`+id_cliente+`', '`+descripcion+`', '`+factura+`', '`+observaciones+`', '/uploads/remitos/`+file.filename+`')`;
    //sql = `INSERT INTO remitos (fecha) VALUES ('`+fecha+`')`;
    //console.log('la consulta sql queda: '+ sql);
    //console.log('el dia de la fecha que llega es: '+ dia);
    //console.log('el mesa de la fecha que llega es: '+ mes);
    //console.log('el año de la fecha que llega es: '+ anio);
    console.log('FECHA RECIBIDA es: '+ fecha_remito);
    conex.query(await sql, function(error, resultado, fields){
        if (error) {
            return res.status(404).send("Ha ocurrido un error en la consulta:" + error.message);
        }
        res.status(200).send("Nuevo Remito Agregado Correctamente");
    });
};

//
/*
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
*/
module.exports = remitoCtrl;