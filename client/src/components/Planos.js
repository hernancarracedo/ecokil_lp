import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Planos extends Component {

    state = {
        planos: []
    }

    async componentDidMount() {
        console.log("id: "+this.props.match.params.id);
        this.getPlanos();
    }

    getPlanos = async () => {
        const res = await axios.get('http://localhost:5000/plano/' + this.props.match.params.id)
        this.setState({
            planos: res.data
        });
    }

    deleteCliente = async (clienteId) => {
        await axios.delete('http://localhost:5000/cliente/delete/' + clienteId);
        this.getClientes();
    }

    render() {
        return (
            <div className="container-fluid">
                <h1 className="mt-4"><i className="fa fa-crosshairs mr-3 text-primary"></i> Planos cliente                                 
                <Link to={"/cliente/"} title="nuevo cliente" className="btn btn-success btn ml-3">
                    <i className="fa fa-bolt"></i>
                </Link>
                </h1>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="th-sm">Cliente</th>
                            <th className="th-sm">Sucursal</th>
                            <th className="th-sm">Plano</th>
                            <th className="th-sm">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                {
                    this.state.planos.map(plano => {
                        return <tr key={plano.id_plano}>
                            <td>{plano.tx_cliente}</td>
                            <td>{plano.tx_sucursal}</td>
                            <td>{plano.tx_plano}</td>
                            <td>
                                <Link to={"/clienteUpdate/" + plano.id_plano} className="btn btn-warning mr-2" title="actualizar cliente">
                                    <i className="fa fa-pencil"></i>
                                </Link>
                                <Link to={"/dispositivosMonitoreo/" + plano.id_plano} className="btn btn-primary mr-2" title="Carga Monitoreo Dispositivos">
                                    <i className="fa fa-search-plus"></i>
                                </Link>
                            </td>
                        </tr>    
                    })
                }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="th-sm">Cliente</th>
                            <th className="th-sm">Sucursal</th>
                            <th className="th-sm">Plano</th>
                            <th className="th-sm">Acciones</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        )
    }
}