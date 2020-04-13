import React, { Component } from 'react'
import axios from 'axios'
//import { format } from 'timeago.js'
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
        await axios.put('http://localhost:5000/cliente/delete/' + clienteId);
        this.getClientes();
    }


/*
    async componentDidMount(){
        const res = await fetch('http://localhost:5000/cliente'); 
        const data = await res.json();
        this.setState({clientes: data})
    }
*/
    render() {
        return (
            <div className="container-fluid">
                <h1 className="mt-4"><i class="fa fa-address-book-o"></i> Clientes                                 
                <Link to={"/cliente/"} title="nuevo cliente" className="btn btn-success btn-sm ml-3">
                    <i class="fa fa-plus"></i>
                </Link>
                </h1>

                
                <table class="table table-hover">
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
                                <button className="btn btn-danger mr-2" title="borrar cliente" onClick={() => this.deleteCliente(cliente.id_cliente)}>
                                    <i class="fa fa-trash"></i>
                                </button>
                                <Link to={"/clienteUpdate/" + cliente.id_cliente} className="btn btn-warning" title="actualizar cliente">
                                    <i class="fa fa-pencil"></i>
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