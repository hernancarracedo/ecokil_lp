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
        this.getSaldo();
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

    getSaldo =  async () => {
        const res = await axios.get('http://localhost:5000/saldo/' + this.props.match.params.id)
        console.log("el saldo es: " + res.data.saldo)
        this.setState({
            saldoCuenta: res.data.saldo
        });
    }

    deleteMovimiento = async (movimientoId) => {
        let registroMov = this.state.detalleCuenta.filter(registro => registro.id === movimientoId );
        let tipo_doc = registroMov[0].tipo_doc;
        if (tipo_doc === 'FC') {
            await axios.delete('http://localhost:5000/factura/delete/' + movimientoId);
        }

        if (tipo_doc === 'RC') {
            await axios.delete('http://localhost:5000/pago/delete/' + movimientoId);
        }

        this.getSaldo();
        this.getDetalleCuenta();
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
                            <td>$ {registro.monto}</td>
                            <td>
                                <button 
                                    className="btn-sm btn-danger mr-2 " 
                                    title="borrar movimiento" 
                                    onClick={() => this.deleteMovimiento(registro.id)}
                                >
                                    <i className="fa fa-trash"></i>
                                </button>

                                { registro.tipo_doc === 'FC' 
                                ?
                                    <Link  to={"/facturaUpdate/" + registro.id} className="btn-sm btn-warning mr-2 pt-2 pb-2" title="actualizar factura">
                                        <i className="fa fa-pencil"></i>
                                    </Link>
                                :
                                    <span></span>
                                }
                                { registro.tipo_doc === 'RC' 
                                ?
                                    <Link  to={"/pagoUpdate/" + registro.id} className="btn-sm btn-warning mr-2  pt-2 pb-2" title="actualizar pago">
                                        <i className="fa fa-pencil"></i>
                                    </Link>
                                :
                                   <span></span>
                                }




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
                            <th className="th-sm">$ {this.state.saldoCuenta}</th>
                            <th className="th-sm"></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        )
    }
}