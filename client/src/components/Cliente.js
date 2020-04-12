import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class Cliente extends Component {

    state = {
        id_cliente: '',
        tx_cliente: '',
        id_tipo_cliente: '',
        observaciones: '',
        fecha_alta: new Date(),
        razon_social: '',
        cuit: '',
        domicilio: '',
        idTipoClienteSelected: '',
        tiposCliente: [],
        editing: false,

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
                id_cliente: res.data.id_cliente,
                tx_cliente: res.data.tx_cliente,
                observaciones: res.data.observaciones,
                fecha_alta: new Date(res.data.fecha_alta),
                idTipoClienteSelected: res.data.id_tipo_cliente,
                razon_social: res.data.razon_social,
                cuit: res.data.cuit,
                domicilio: res.data.domicilio,
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            console.log(this.state);
            const updatedCliente = {
                id_cliente:  this.state.id_cliente,
                tx_cliente:  this.state.tx_cliente,
                id_tipo_cliente:  this.state.id_tipo_cliente,
                observaciones:  this.state.observaciones,
                fecha_alta: this.state.fecha_alta,
                razon_social: this.state.razon_social,
                cuit: this.state.cuit,
                domicilio: this.state.domicilio
            };
            await axios.put('http://localhost:5000/cliente/edit/' + this.state.id_cliente, updatedCliente);
        } else {
            console.log(this.state);  
            const newCliente = {
                tx_cliente:  this.state.tx_cliente,
                id_tipo_cliente:  this.state.id_tipo_cliente,
                observaciones:  this.state.observaciones,
                fecha_alta: this.state.fecha_alta,
                razon_social: this.state.razon_social,
                cuit: this.state.cuit,
                domicilio: this.state.domicilio                
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
            <div className="container-fluid">
               <h1 className="mt-4">CLIENTES</h1>
                    <form onSubmit={this.onSubmit}>
                       
                        {/* Nombre de fantasía del cliente */}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="tx_cliente">Nombre:</label>
                            <div className="col-md-9"> 
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Cliente"
                                    onChange={this.onInputChange}
                                    name="tx_cliente"
                                    value={this.state.tx_cliente}
                                    required />
                            </div>
                        </div>
                        {/* Razon Social del cliente */}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="razon_social">Razon Social:</label>
                            <div className="col-md-9"> 
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ingrese Razon Social"
                                    onChange={this.onInputChange}
                                    name="razon_social"
                                    value={this.state.razon_social}/>
                            </div>
                        </div>
                        {/* CUIT del cliente */}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="cuit">CUIT:</label>
                            <div className="col-md-9"> 
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ingrese CUIT"
                                    onChange={this.onInputChange}
                                    name="cuit"
                                    value={this.state.cuit} />
                            </div>                        
                        </div>
                        {/* Domicilio del cliente */}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="domicilio">Domicilio:</label>
                            <div className="col-md-9"> 
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ingrese domicilio"
                                    onChange={this.onInputChange}
                                    name="domicilio"
                                    value={this.state.domicilio} 
                                    required />
                            </div>                        
                        </div>
                        {/* SELECCIONAR TIPO DE CLIENTE */}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="tx_tipo_cliente">Tipo Cliente:</label>
                            <div className="col-md-9"> 
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
                        </div>
                        {/* Observaciones del cliente */}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="observaciones">Observaciones:</label>
                            <div className="col-md-9">                             
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
                        </div>
                        {/* Fecha de alta del Cliente */}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="fecha_alta">Fecha Alta:</label>
                            <br/>                     
                            <div className="col-md-9"> 
                                <DatePicker 
                                    className="form-control" 
                                    selected={this.state.fecha_alta} 
                                    onChange={this.onChangeDate} />
                            </div>
                        </div>
                        <br /> 

                        <button className="btn btn-primary btn-block">
                            Guardar Cliente <i className="material-icons">save</i>
                        </button>
                    </form>
 
            </div>
        )
    }
}