import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
/*
const data = [
    { id: 1, title: 'Conan the Barbarian', year: '1982' }, 
    { id: 2, title: 'Los Super agentes', year: '1986' },
    { id: 3, title: 'Odisea del Espacio', year: '2002' }
];
*/
const data = [
    { id: 1, title: 'Conan the Barbarian' }, 
    { id: 2, title: 'Los Super agentes' },
    { id: 3, title: 'Odisea del Espacio' }
];

const columns = [
    {
      name: 'ID',
      selector: 'id_tipo_cliente',
      sortable: true,
    },
    {
      name: 'Tipo Cliente',
      selector: 'tx_tipo_cliente',
      sortable: true,
      right: true,
    },
  ];

export default class ClienteTipos extends Component {

    state = {
        clienteTipos: [],
        contenido: []
    }

    async componentDidMount() {
        this.getClienteTipos();
    }

    getClienteTipos = async () => {
        const res = await axios.get('http://localhost:5000/clientetipo')

        this.setState({
            clienteTipos: res.data
            //clienteTipos: data
        });
        
        const botonBorrar = "<button className='btn btn-danger mr-2' title='borrar tipo cliente' onClick={() => this.deleteClienteTipo(clienteTipo.id_tipo_cliente)}> <i className='fa fa-trash'></i></button>"
        const botonUpdate = "<Link to={'/clienteTipoUpdate/' + clienteTipo.id_cliente_tipo} className='btn btn-warning' title='actualizar tipo cliente'> <i className='fa fa-pencil'></i> </Link>"

        this.state.clienteTipos.map(clienteTipo => {
            return this.state.contenido.push(
                    { id: clienteTipo.id_tipo_cliente, 
                     tx_tipo_cliente : clienteTipo.tx_tipo_cliente,
                     acciones : botonBorrar + botonUpdate
                    })
        })
    }

    deleteClienteTipo = async (clienteTipoId) => {
        await axios.delete('http://localhost:5000/clientetipo/delete/' + clienteTipoId);
        this.getClienteTipos();
    }

    render() {
        return (
            /*
            <DataTable
            title="Tipos de Cliente"
            columns={columns}
            //data={this.state.contenido}
            data={data}
          />
          */
           
            <div className="container-fluid">
                <div className="col-md-8 offset-md-2">
                <h1 className="mt-4">
                    <i className="fa fa-th text-primary mr-3"></i> 
                    Tipos de Cliente
                <Link to={"/cliente/"} title="nuevo cliente" className="btn btn-success btn ml-3">
                    <i className="fa fa-bolt"></i>
                </Link>
                </h1>

                
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="th-sm">ID</th>
                            <th className="th-sm">Tipo Cliente</th>
                            <th className="th-sm">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                {
                    this.state.clienteTipos.map(clienteTipo => {
                        return <tr key={clienteTipo.id_tipo_cliente}>
                            <td>{clienteTipo.id_tipo_cliente}</td>
                            <td>{clienteTipo.tx_tipo_cliente}</td>
                            <td>
                                <button 
                                    className="btn btn-danger mr-2" 
                                    title="borrar tipo cliente" 
                                    onClick={() => this.deleteClienteTipo(clienteTipo.id_tipo_cliente)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                                <Link 
                                    to={"/clienteTipoUpdate/" + clienteTipo.id_cliente_tipo} 
                                    className="btn btn-warning" 
                                    title="actualizar tipo cliente">
                                    <i className="fa fa-pencil"></i>
                                </Link>
                            </td>
                        </tr>    
                    })
                }
                    </tbody>
                    <tfoot>
                        <tr>
                        <th className="th-sm">ID</th>
                            <th className="th-sm">Tipo Cliente</th>
                            <th className="th-sm">Acciones</th>
                        </tr>
                    </tfoot>

                </table>
                </div>
            </div>
 
        )
    }
}