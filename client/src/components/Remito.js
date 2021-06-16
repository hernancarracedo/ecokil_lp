//import React from 'react'
import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const axios = require("axios");

export default class Remito extends Component {
    /**
    constructor(props) {
        super(props);
        this.state ={
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    */

   constructor(props) {
    super(props);
    this.state = {
        file: null,
        id_remito: '',
        id_cliente: '',
        descripcion: '',
        monto: '',
        observaciones: '',
        fecha: new Date(),
        idClienteSelected: '',
        clientes: [],
        sucursales: [],
        idSucursalSelected: '',
        editing: false,
    };

    //this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    
    this.onClienteChange = this.onClienteChange.bind(this);
  }
/*
   state = {

    }
*/
    async componentDidMount() {
        const res = await axios.get('http://localhost:5000/cliente');
        if (res.data.length > 0) {
            this.setState({
                clientes: res.data.map(cliente => [cliente.id_cliente,cliente.tx_cliente]),
                //idClienteSelected: res.data[0].id_cliente
            })
        }
        if (this.props.match.params.id) {
            const res = await axios.get('http://localhost:5000/pago/' + this.props.match.params.id);
            this.setState({
                id: res.data.id,
                observaciones: res.data.observaciones,
                fecha: new Date(res.data.fecha),
                idClienteSelected: res.data.id_cliente,
                descripcion: res.data.descripcion,
                monto: res.data.monto,
                editing: true
            });
        }
    }


    onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        formData.append('fecha',new Date(this.state.fecha));
        formData.append('id_cliente',this.state.idClienteSelected);
        formData.append('nro_remito',this.state.nro_remito);
        formData.append('descripcion',this.state.descripcion);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        
        await axios.post("/remito/create",formData,config)
            .then((response) => {
                alert("El remito ha sido guardado exitosamente");
            }).catch((error) => {
        });
        // prueba de la siguiente linea
        window.location.href = '/remitos';
        
    }
    
    onInputChange = (e) => {
    //onChange(e) {
        //this.setState({file:e.target.files[0]});
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onClienteChange = async (e) => {
        let cliente = e.target.value;
        const res = await axios.get('http://localhost:5000/sucursalcliente/' + cliente);
        this.setState({
            idSucursalSelected: '',            
            sucursales: res.data.map(sucursal => [sucursal.id_sucursal,sucursal.tx_sucursal]),
            idClienteSelected: cliente
        })
    }

    handleChange2(event) {
        this.setState({idSucursalSelected: event.target.value});
    }

    onChangeFile = (e) => {
            this.setState({file:e.target.files[0]});
        }

    onChangeDate = fecha => {
        this.setState({ fecha });
    }

    render() {
                   {/**  <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange= {this.onChange} />
                <button type="submit">Upload</button>
            </form>
            */}
        return (


<div className="container-fluid">

     <div className="col-md-8 offset-md-2">
     <h1 className="mt-4">
        <i className="fa fa-edit text-primary mr-3"></i>
         Remito
    </h1>
     <form onSubmit={this.onSubmit}>

         {/* Fecha de Remito */}
         <div className="form-group row">
             <label className="col-sm-3 col-form-label" htmlFor="fecha">Fecha Servicio:</label>
             <br/>                     
             <div className="col-md-9"> 
                 <DatePicker 
                     className="form-control" 
                     mode = "date"
                     format = "YYYY-MM-DD"
                     selected={this.state.fecha} 
                     onChange={this.onChangeDate} />
             </div>
         </div>
        
         {/* Nro de Cheque */}
         <div className="form-group row">
             <label className="col-sm-3 col-form-label" htmlFor="ro_remito">Nro Remito:</label>
             <div className="col-md-9"> 
                 <input
                     type="text"
                     className="form-control"
                     placeholder="ingrese nro de remito"
                     onChange={this.onInputChange}
                     name="nro_remito"
                     value={this.state.nro_remito} />
             </div>                        
         </div>
         {/* Descripcion del Remito */}
         <div className="form-group row">
             <label className="col-sm-3 col-form-label" htmlFor="descripcion">Descripcion:</label>
             <div className="col-md-9"> 
                 <input
                     type="text"
                     className="form-control"
                     placeholder="ingrese descripcin del remito"
                     onChange={this.onInputChange}
                     name="descripcion"
                     value={this.state.descripcion} />
             </div>                        
         </div>


         {/* Monto del Pago */}
         <div className="form-group row">
             <label className="col-sm-3 col-form-label" htmlFor="monto">Monto:</label>
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
                     onChange={this.onClienteChange}
                     name="idClienteSelected"
                     required>
                         <option value=''>Seleccion cliente...</option>
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

         {/* SELECCIONAR SUCURSAL */}
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
                    
         {/* Archivo escaneado del remito */}
         <div className="form-group row">
             <label className="col-sm-3 col-form-label" htmlFor="archivo">Archivo <i className="fa fa-paperclip"></i> :</label>
             <div className="col-md-9">  
                <input type="file" name="myImage" onChange= {this.onChangeFile} />
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
                     value={this.state.observaciones}
                     >
                 </textarea>
             </div>                    
         </div>

         <br /> 

         <button className="btn-lg btn-primary btn-block">
         <i className="fa fa-save"></i> Guardar Remito 
         </button>
     </form>
 </div>                    
</div>

        )
    }
}
