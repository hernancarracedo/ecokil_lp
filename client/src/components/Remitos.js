import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Remitos extends Component {

    state = {
        remitos: []
    }

    async componentDidMount() {
        this.getRemitos();
    }

    getRemitos = async () => {
        const res = await axios.get('http://localhost:5000/remitos/')
        this.setState({
            remitos: res.data
        });
    }

    deleteRemito = async (remitoId) => {
        await axios.delete('http://localhost:5000/remito/delete/' + remitoId);
        this.getRemitos();
    }

    render() {
        return (
            <div className="container-fluid">
                <h1 className="mt-4"><i className="fa fa-edit text-primary mr-3"></i>Remitos
                  <Link to={"/remito/"} title="nuevo remito" className="btn btn-success btn ml-3">
                    <i className="fa fa-bolt"></i>
                </Link>
                </h1>

                
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="th-sm">Cliente</th>
                            <th className="th-sm">Remito</th>
                            <th className="th-sm">fecha</th>
                            <th className="th-sm">Descripcion</th>
                            <th className="th-sm">archivo</th>
                            <th className="th-sm">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                {
                    this.state.remitos.map(remito => {
                        return <tr key={remito.id_remito}>
                            <td>{remito.tx_cliente}</td>
                            <td>{remito.nro_remito}</td>
                            <td>{remito.fecha2}</td>
                            <td>{remito.descripcion}</td>
                            <td>{remito.file_name}</td>
                            <td>
                                <button className="btn-sm btn-danger mr-2" title="borrar remito" onClick={() => this.deleteRemito(remito.id_remito)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                                <Link to={"/remitoUpdate/" + remito.id_remito} className="btn-sm btn-warning mr-2 pt-2 pb-2" title="actualizar remito">
                                    <i className="fa fa-pencil"></i>
                                </Link>
                            </td>
                        </tr>    
                    })
                }
                    </tbody>
                    <tfoot>
                        <tr>
                        <th className="th-sm">Cliente</th>
                            <th className="th-sm">Remito</th>
                            <th className="th-sm">fecha</th>
                            <th className="th-sm">Descripcion</th>
                            <th className="th-sm">archivo</th>
                            <th className="th-sm">Acciones</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        )
    }
}