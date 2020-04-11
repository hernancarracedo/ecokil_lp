import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class Cliente extends Component {

    state = {
        tx_cliente: '',
        id_tipo_cliente: '',
        observaciones: '',
        fecha_alta: new Date(),
        idTipoClienteSelected: '',
        tiposCliente: [],
        editing: false,
        id_cliente: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:5000/tipos-cliente');
        if (res.data.length > 0) {
            this.setState({
                tiposCliente: res.data.map(tipo => [tipo.id_tipo_cliente,tipo.tx_tipo_cliente]),
                idTipoClienteSelected: res.data[0].id_tipo_cliente
            })
        }
        console.log(this.props.match.params.id)
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:5000/cliente/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                tx_cliente: res.data.tx_cliente,
                observaciones: res.data.observaciones,
                fecha_alta: new Date(res.data.fecha_alta),
                idTipoClienteSelected: res.data.id_tipo_cliente,
                id_cliente: res.data.id_cliente,
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            console.log(this.state);
            const updatedCliente = {
                tx_cliente:  this.state.tx_cliente,
                id_tipo_cliente:  this.state.id_tipo_cliente,
                observaciones:  this.state.observaciones,
                fecha_alta: this.state.fecha_alta
            };
            await axios.put('http://localhost:5000/cliente/edit/' + this.state.id_cliente, updatedCliente);
        } else {
            console.log(this.state);  
            const newCliente = {
                tx_cliente:  this.state.tx_cliente,
                id_tipo_cliente:  this.state.id_tipo_cliente,
                observaciones:  this.state.observaciones,
                fecha_alta: this.state.fecha_alta
            };
            axios.post('http://localhost:5000/cliente/add', newCliente);
        }
        window.location.href = '/clientes';
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = fecha_alta => {
        this.setState({ fecha_alta });
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>CLIENTE</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* Note Title */}
                        <div className="form-group">
                            <label htmlFor="tx_cliente">Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre Cliente"
                                onChange={this.onInputChange}
                                name="tx_cliente"
                                value={this.state.tx_cliente}
                                required />
                        </div>
                        {/* SELECT THE USER */}
                        <div className="form-group">
                            <label htmlFor="tx_tipo_cliente">Tipo Cliente:</label>
                            <select
                                className="form-control"
                                value={this.state.idTipoClienteSelected}
                                onChange={this.onInputChange}
                                name="id_tipo_cliente"
                                required>
                                {
                                    this.state.tiposCliente.map(tipoCliente => (
                                        <option key={tipoCliente[0]} value={tipoCliente[0]}>
                                            {tipoCliente[1]}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Note Content */}
                        <div className="form-group">
                            <label htmlFor="observaciones">Observaciones:</label>
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Observaciones"
                                name="observaciones"
                                onChange={this.onInputChange}
                                value={this.state.observaciones}
                                required>
                            </textarea>
                        </div>
                        {/* Note Date */}
                        <div className="form-group">
                            <label htmlFor="fecha_alta">Fecha Alta:</label>
                            <br/>                     
                            <DatePicker className="form-control" selected={this.state.fecha_alta} onChange={this.onChangeDate} />
                        </div>
                        <button className="btn btn-primary">
                            Guardar Cliente <i className="material-icons">save</i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}