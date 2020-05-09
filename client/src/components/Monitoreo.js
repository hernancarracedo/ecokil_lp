import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'

export default class Monitoreo extends Component {
    state = {
        id_plano: this.props.match.params.id,
        cebaderas: [],
        referencias: [],
        fechaMonitoreo : new Date(),
    }

    async componentDidMount() {
        this.getDispositivos();
        this.getReferencias();
        console.log(this.state.cebaderas);
    }

    getDispositivos = async () => {
        const res = await axios.get('http://localhost:5000/dispositivos/' + this.props.match.params.id);
        this.setState({
           //cebaderas: res.data.map(cebadera => [cebadera.id_dispositivo,cebadera.tx_dispositivo, 7]),
           cebaderas: res.data.map(cebadera => ({
               id: cebadera.id_dispositivo, 
               tx: cebadera.tx_dispositivo, 
               monitoreo: 7}))
        });
        console.log(this.state);
    }

    getReferencias = async () => {
        const res = await axios.get('http://localhost:5000/referencias/');
        this.setState({
            referencias: res.data.map(refe => [refe.id_referencia,refe.tx_referencia]),
            referenciaSelected: '7'
        });
    }

    _onChangeUser = (index, field, event) => {
        const newValue = event.target.value;
        this.setState(state => {
          const cebaderas = [
            ...state.cebaderas.slice(0, index),
            {
              ...state.cebaderas[index],
              [field]: newValue,
            },
            ...state.cebaderas.slice(index + 1),
          ];
          return {
            cebaderas,
          };
        });
        console.log(this.state.cebaderas);
      };

    //_onSubmit = async (e) => {
    _onSubmit = event => {
        event.preventDefault();
        const newMonitoreo = []
        this.state.cebaderas.map(cebadera => newMonitoreo.push({
            id_dispositivo: cebadera.id, 
            id_referencia: cebadera.monitoreo, 
            fecha: this.state.fechaMonitoreo})
        )
        axios.post('http://localhost:5000/dispositivos/create/', newMonitoreo);
        window.location.href = '/';
      };

      onChangeDate = fechaMonitoreo => {
        this.setState({ fechaMonitoreo });
    }

    render() {
        return (
            <div className="container-fluid">
                <h1 className="mt-4"><i className="fa fa-search"></i> Monitoreo Dispositivos</h1>
                <form onSubmit={this._onSubmit}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="th-sm">Dispositivo</th>
                            <th className="th-sm">Observado</th>
                        </tr>
                    </thead>
                    <tbody>
                   
                {
                    
                    this.state.cebaderas.map((cebadera, index) => {
                        return <tr key={index}>
                            <td>Cebadera {cebadera.tx}</td>
                            <td>
                                {/* SELECCIONAR LO OBSERVADO */}
                                <div className="form-group row">
                                    <div className="col-md-9"> 
                                        <select
                                            className="form-control"
                                            value={cebadera.monitoreo}
                                            onChange={this._onChangeUser.bind(this, index, 'monitoreo')}
                                            name={cebadera.tx}
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
                    <tr>
                    <td><p class="text-primary">Fecha Monitoreo</p></td>
                    <td>
                        <DatePicker 
                            className="form-control" 
                            selected={this.state.fechaMonitoreo} 
                            onChange={this.onChangeDate} 
                        />
                    </td>
                    </tr>
                    </tbody>

                </table>
                <div className="d-flex justify-content-center"><button className="btn btn-danger btn-lg btn-block" type="submit">Confirma Monitoreo</button></div>
          </form>
            </div>
        )
    }
}