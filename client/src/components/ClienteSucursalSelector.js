import React, { Component } from 'react'
import axios from 'axios'

export default class ClienteSucursalSelector extends Component {
    constructor(props) {
      super(props);
      this.state = {
        clientes: [],        
        idClienteSelected: '',
        sucursales: [],
        idSucursalSelected: '',
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
      this.onInputChange = this.onInputChange.bind(this);
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:5000/cliente');
        if (res.data.length > 0) {
            this.setState({
                clientes: res.data.map(cliente => [cliente.id_cliente,cliente.tx_cliente]),
                idClienteSelected: res.data[0].id_cliente
            })
        }
        const res2 = await axios.get('http://localhost:5000/sucursalcliente/' + this.state.idClienteSelected);
        if (res2.data.length > 0) {
            this.setState({
                sucursales: res2.data.map(sucursal => [sucursal.id_sucursal,sucursal.tx_sucursal]),
            })
        }
    }

    onInputChange = async (e) => {
        let cliente = e.target.value;
        const res = await axios.get('http://localhost:5000/sucursalcliente/' + cliente);
        this.setState({
            idSucursalSelected: '',            
            sucursales: res.data.map(sucursal => [sucursal.id_sucursal,sucursal.tx_sucursal]),
            idClienteSelected: cliente
        })
    }
  
    handleChange(event) {
      console.log(event.target.value)
      const options = event.target.value === 'fruits' ? ['apple', 'pineapple', 'strawberry'] : ['carrot', 'korn', 'potato'];
      console.log(options)
        this.setState({
          options,
          value: event.target.value
        });
    }
    
    handleChange2(event) {
      this.setState({idSucursalSelected: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      alert(`${this.state.idClienteSelected} ${this.state.idSucursalSelected}`);
    }
  
    render() {
      return (
        <div className="container-fluid">
            <div className="col-md-8 offset-md-2">
                <h1 className="mt-4">CLIENTE - SUCURSAL</h1>
                <form onSubmit={this.handleSubmit}>
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
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label" htmlFor="tx_cliente">Sucursal:</label>
                        <div className="col-md-9"> 
                            
                            <select value={this.state.value2} onChange={this.handleChange2} className="form-control" name="idSucursalSelected">
                                <option value=''>Seleccion sucursal...</option>
                                {
                                    this.state.sucursales.map((sucursal, index) => <option value={sucursal[0]} key={index}>{sucursal[1]}</option>)
                                }
                            </select>
                        </div>      
                    </div>                
                <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
                </form>
            </div>
        </div>
      );
    }
  }
  
