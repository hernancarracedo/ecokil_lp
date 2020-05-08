import React, { Component } from 'react'
import axios from 'axios'

export default class ClienteTipo extends Component {

    state = {
        id_tipo_cliente: '',
        tx_tipo_cliente: '',
        editing: false
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:5000/clientetipo/' + this.props.match.params.id);
            //console.log(res.data)
            this.setState({
                id_tipo_cliente: res.data.id_tipo_cliente,
                tx_tipo_cliente: res.data.tx_tipo_cliente,
                editing: true
            });
            //console.log(this.state)
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            console.log(this.state);
            const updatedClienteTipo = {
                id_tipo_cliente: this.state.id_tipo_cliente,
                tx_tipo_cliente:  this.state.tx_tipo_cliente
            };
            await axios.put('http://localhost:5000/clientetipo/update/' + this.state.id_tipo_cliente, updatedClienteTipo);
        } else {
            //console.log(this.state);  
            const newTipoCliente = {
                tx_tipo_cliente:  this.state.tx_tipo_cliente   
            };
            axios.post('http://localhost:5000/clientetipo/create/', newTipoCliente);
        }
        window.location.href = '/clienteTipos';
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="container-fluid">
               <h1 className="mt-4">TIPO CLIENTE</h1>
                    <div className="col-md-8 offset-md-2">
                    <form onSubmit={this.onSubmit}>
                       
                        {/* Nombre del tipo de cliente */}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="tx_tipo_cliente">Tipo Cliente:</label>
                            <div className="col-md-9"> 
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese Tipo Cliente"
                                    onChange={this.onInputChange}
                                    name="tx_tipo_cliente"
                                    value={this.state.tx_tipo_cliente}
                                    required />
                            </div>
                        </div>

                        <button className="btn btn-primary btn-block">
                        <i className="fa fa-save"></i> Guardar Tipo Cliente 
                        </button>
                    </form>
                </div>                    
            </div>
        )
    }
}