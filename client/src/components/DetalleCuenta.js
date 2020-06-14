import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class DetalleCuenta extends Component {

    state = {
        tx_cliente: '',
        detalleCuenta: [],
        saldoCuenta: '0'
    }

    async componentDidMount() {
        this.getDetalleCuenta();
    }

    getDetalleCuenta = async () => {
        const res = await axios.get('http://localhost:5000/detalleCuenta/' + this.props.match.params.id)
        //console.log(res.data);
        let tx_cliente = 'Sin movimientos'
        if(res.data.length > 0) {
            tx_cliente = res.data[0].tx_cliente;
        }
        this.setState({
            detalleCuenta: res.data,
            tx_cliente: tx_cliente
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h1 className="mt-4">
                    <i className="fa fa-folder-open-o"></i> {this.state.tx_cliente}
                </h1>

                
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="th-sm">Fecha</th>
                            <th className="th-sm">Tipo</th>
                            <th className="th-sm">Comprobante</th>
                            <th className="th-sm">Monto</th>
                            <th className="th-sm">Acciones</th>

                        </tr>
                    </thead>
                    <tbody>
                {
                    this.state.detalleCuenta.map(registro => {
                        return <tr key={registro.id}>
                            <td>{registro.fecha_alta}</td>
                            <td>{registro.tipo_doc}</td>
                            <td>{registro.factura} {registro.cheque}</td>
                            <td>{registro.monto}</td>
                            <td>
                                <button className="btn-sm btn-danger mr-2 " title="borrar movimiento" onClick={() => this.deleteCliente(registro.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                                <Link to={"/clienteUpdate/" + registro.id} className="btn-sm btn-warning mr-2" title="actualizar movimiento">
                                    <i className="fa fa-pencil"></i>
                                </Link>
                            </td>
                        </tr>    
                    })
                }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="th-sm"></th>
                            <th className="th-sm"></th>
                            <th className="th-sm"></th>
                            <th className="th-sm">Monto</th>
                            <th className="th-sm"></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        )
    }
}