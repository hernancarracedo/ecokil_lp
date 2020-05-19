import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Clientes extends Component {

    state = {
        clientes: []
    }

    async componentDidMount() {
        this.getClientes();
    }

    getClientes = async () => {
        const res = await axios.get('http://localhost:5000/cliente/')
        this.setState({
            clientes: res.data
        });
    }

    deleteCliente = async (clienteId) => {
        await axios.delete('http://localhost:5000/cliente/delete/' + clienteId);
        this.getClientes();
    }

    render() {
        return (
            <div className="container-fluid">
                <h1 className="mt-4"><i className="fa fa-address-book-o"></i> Clientes                                 
                <Link to={"/cliente/"} title="nuevo cliente" className="btn btn-success btn-sm ml-3">
                    <i className="fa fa-plus"></i>
                </Link>
                </h1>

                
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="th-sm">Cliente</th>
                            <th className="th-sm">Tipo</th>
                            <th className="th-sm">Alta</th>
                            <th className="th-sm">Observaciones</th>
                            <th className="th-sm">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                {
                    this.state.clientes.map(cliente => {
                        return <tr key={cliente.id_cliente}>
                            <td>{cliente.tx_cliente}</td>
                            <td>{cliente.tx_tipo_cliente}</td>
                            <td>{cliente.fecha_alta}</td>
                            <td>{cliente.observaciones}</td>
                            <td>
                                <button className="btn-sm btn-danger mr-2 " title="borrar cliente" onClick={() => this.deleteCliente(cliente.id_cliente)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                                <Link to={"/clienteUpdate/" + cliente.id_cliente} className="btn-sm btn-warning mr-2" title="actualizar cliente">
                                    <i className="fa fa-pencil"></i>
                                </Link>
                                <Link to={"/planos/" + cliente.id_cliente} className="btn-sm btn-success mr-2" title="planos cliente">
                                    <i className="fa fa-bug"></i>
                                </Link>
                            </td>
                        </tr>    
                    })
                }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="th-sm">Cliente</th>
                            <th className="th-sm">Tipo</th>
                            <th className="th-sm">Alta</th>
                            <th className="th-sm">Observaciones</th>
                            <th className="th-sm">Acciones</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        )
    }
}