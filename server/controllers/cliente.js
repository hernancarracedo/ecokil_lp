const clienteCtrl = {};
const Cliente = require('../models/Cliente');
const ClienteTipo = require('../models/ClienteTipo');

//
clienteCtrl.getClientes = async (req, res) => {
    const clientes = await Cliente.findAll({
         where: { baja: null  }
    });
/*
    const clientes = await Cliente.findAll({
        where: { baja: null },
        include: [ 
        {
          model: ClienteTipo,
            where: {
            //'id_tipo_cliente': current_id_tipo_cliente
            'id_tipo_cliente': Cliente.id_tipo_cliente
        },
        required: false
        }]
    });
*/  
    res.json(clientes);

};

//
clienteCtrl.createCliente = async (req, res) => {
    const { tx_cliente, id_tipo_cliente, razon_social, cuit, domicilio, fecha_alta, observaciones } = req.body;
    const newCliente = {
        tx_cliente: tx_cliente,
        id_tipo_cliente: id_tipo_cliente,
        razon_social: razon_social, 
        cuit: cuit, 
        domicilio: domicilio,
        fecha_alta: fecha_alta,
        observaciones: observaciones
      }
    await Cliente.create(newCliente)
    res.json('Nuevo Cliente Agregado');
};

//
clienteCtrl.getCliente = async (req, res) => {
    const cliente = await Cliente.findOne({
        where: {id_cliente: req.params.id}
    });
    res.json(cliente);
}

//
clienteCtrl.updateCliente = async (req, res) => {
    const { id_cliente, tx_cliente, id_tipo_cliente, razon_social, cuit, domicilio, fecha_alta, observaciones } = req.body;    
    await Cliente.update({ 
        tx_cliente: tx_cliente,
        id_tipo_cliente: id_tipo_cliente,
        razon_social: razon_social, 
        cuit: cuit, 
        domicilio: domicilio,
        fecha_alta: fecha_alta,
        observaciones: observaciones
    }, 
    { 
        where: {id_cliente: id_cliente}
    });
    res.json('Cliente Actualizado');
}

//
clienteCtrl.deleteCliente = async (req, res) => {
    await Cliente.update({ 
        baja: new Date(),
    }, 
    { 
        where: {id_cliente: req.params.id}
    });
    res.json('Cliente Actualizado');
}


module.exports = clienteCtrl;
