import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Saldos extends Component {

    state = {
        saldos: []
    }

    async componentDidMount() {
        this.getSaldos();
    }

    getSaldos = async () => {
        const res = await axios.get('http://localhost:5000/saldos/')
        this.setState({
            saldos: res.data
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h1 className="m-3"><i className="fa fa-balance-scale"></i> SALDOS </h1>

                <div className="row m-1">
                    <div className="col-md-6">
                        <Link to={"/factura/"} title="nueva factura" className="btn-lg btn-danger btn-block mb-3" style={{ textDecoration: 'none', textAlign: 'center' }}>
                            <i className="fa fa-square-o"></i> NUEVA FACTURA
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <Link to={"/pago/"} title="nueva factura" className="btn-lg btn-success btn-block  mb-3" style={{ textDecoration: 'none', textAlign: 'center' }}>
                            <i className="fa fa-check-square-o"></i> NUEVO PAGO
                        </Link>
                    </div>
                </div>
                
                <table className="table table-hover m-3">
                    <thead>
                        <tr>
                            <th className="th-sm">Cliente</th>
                            <th className="th-sm">Saldo</th>
                            <th className="th-sm">Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                {
                    this.state.saldos.map(saldo => {
                        return <tr key={saldo.id_cliente}>
                            <td>{saldo.tx_cliente}</td>
                            <td>$ {saldo.saldo}</td>
                            <td>
                                <Link to={"/detalleCuenta/" + saldo.id_cliente} className="btn btn-warning mr-2" title="planos cliente">
                                    <i className="fa fa-search"></i>
                                </Link>
                            </td>
                        </tr>    
                    })
                }
                    </tbody>


                </table>
            </div>
        )
    }
}