import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class Factura extends Component {

    state = {
        id: '',
        id_cliente: '',
        factura: '',
        monto: '',
        observaciones: '',
        fecha_alta: new Date(),
        idClienteSelected: '',
        clientes: [],
        editing: false,
    }


    async componentDidMount() {
        const res = await axios.get('http://localhost:5000/cliente');
        if (res.data.length > 0) {
            this.setState({
                clientes: res.data.map(cliente => [cliente.id_cliente,cliente.tx_cliente]),
                idClienteSelected: res.data[0].id_cliente
            })
        }
        console.log(this.props.match.params.id)
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:5000/factura/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                id: res.data.id,
                observaciones: res.data.observaciones,
                fecha_alta: new Date(res.data.fecha_alta),
                idClienteSelected: res.data.id_cliente,
                factura: res.data.factura,
                monto: res.data.monto * -1,
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            console.log(this.state);
            const updatedFactura = {
                id_cliente:  this.state.idClienteSelected,
                observaciones:  this.state.observaciones,
                fecha_alta: this.state.fecha_alta,
                factura: this.state.factura,
                monto: this.state.monto * -1
            };
            await axios.put('http://localhost:5000/factura/update/' + this.state.id, updatedFactura);
        } else {
            console.log(this.state);  
            const newFactura = {
                id_cliente:  this.state.idClienteSelected,
                observaciones:  this.state.observaciones,
                fecha_alta: this.state.fecha_alta,
                factura: this.state.factura,
                monto: this.state.monto * -1
            };
            axios.post('http://localhost:5000/factura/create/', newFactura);
        }
        window.location.href = '/saldos';
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
               <h1 className="mt-4">FACTURA</h1>
                    <div className="col-md-8 offset-md-2">
                    <form onSubmit={this.onSubmit}>

                        {/* Fecha de Factura */}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="fecha_alta">Fecha:</label>
                            <br/>                     
                            <div className="col-md-9"> 
                                <DatePicker 
                                    locale={this.state.locale}
                                    className="form-control" 
                                    selected={this.state.fecha_alta} 
                                    onChange={this.onChangeDate} />
                            </div>
                        </div>
                       
                        {/* Nro de Factura */}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="factura">FACTURA:</label>
                            <div className="col-md-9"> 
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ingrese Nro Factura"
                                    onChange={this.onInputChange}
                                    name="factura"
                                    value={this.state.factura} />
                            </div>                        
                        </div>
                        {/* Nro de Factura */}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="monto">MONTO:</label>
                            <div className="col-md-9"> 
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ingrese Monto Factura"
                                    onChange={this.onInputChange}
                                    name="monto"
                                    value={this.state.monto} />
                            </div>                        
                        </div>

                        {/* SELECCIONAR CLIENTE */}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="idClienteSelected">Cliente:</label>
                            <div className="col-md-9"> 
                                <select
                                    className="form-control"
                                    value={this.state.idClienteSelected}
                                    onChange={this.onInputChange}
                                    name="idClienteSelected"
                                    required>
                                    {
                                        this.state.clientes.map(cliente => (
                                            <option key={cliente[0]} value={cliente[0]}>
                                                {cliente[1]}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>                        
                        </div>
                        {/* Observaciones de la factura */}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="observaciones">Observaciones:</label>
                            <div className="col-md-9">                             
                                <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Observaciones"
                                    name="observaciones"
                                    onChange={this.onInputChange}
                                    value={this.state.observaciones}>
                                </textarea>
                            </div>                    
                        </div>

                        <br /> 

                        <button className="btn-lg btn-primary btn-block">
                        <i className="fa fa-save"></i> Guardar Factura 
                        </button>
                    </form>
                </div>                    
            </div>
        )
    }
}