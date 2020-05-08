import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Monitoreo extends Component {

    state = {
        cebaderas: [],
        referencias: []
    }

    async componentDidMount() {
        this.getDispositivos();
        this.getReferencias();
        //console.log(this.state.referencias);
        console.log(this.state.cebaderas);
    }

    getDispositivos = async () => {
        const res = await axios.get('http://localhost:5000/dispositivos/' + this.props.match.params.id);
        this.setState({

            //cebaderas: res.data
            cebaderas: res.data.map(cebadera => [cebadera.id_dispositivo,cebadera.tx_dispositivo, 7]),
        });
    }

    getReferencias = async () => {
        const res = await axios.get('http://localhost:5000/referencias/');
        this.setState({
            //referencias: res.data
            referencias: res.data.map(refe => [refe.id_referencia,refe.tx_referencia]),
            referenciaSelected: '7'
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h1 className="mt-4"><i className="fa fa-search"></i> Monitoreo Dispositivos</h1>

                
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="th-sm">Dispositivo</th>
                            <th className="th-sm">Observado</th>
                        </tr>
                    </thead>
                    <tbody>
                {
                    this.state.cebaderas.map(cebadera => {
                        return <tr key={cebadera[0]}>
                            <td>Cebadera {cebadera[1]}</td>
                            <td>
                                {/* SELECCIONAR TIPO DE CLIENTE */}
                                <div className="form-group row">
                                    <div className="col-md-9"> 
                                        <select
                                            className="form-control"
                                            value={cebadera[2]}
                                            onChange={this.onInputChange}
                                            name={cebadera[0]}
                                            //name="idTipoClienteSelected"
                                            required>
                                            {
                                                this.state.referencias.map(referencia => (
                                                    <option key={referencia[0]} value={referencia[0]}>
                                                        {referencia[1]}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>                        
                                </div>

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