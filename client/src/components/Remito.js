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

   state = {
        file: null,

        id_remito: '',
        id_cliente: '',
        descripcion: '',
        monto: '',
        observaciones: '',
        fecha: new Date(),
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
        /*
        const newRemito = {
            //id_cliente:  this.state.idClienteSelected,
            //observaciones:  this.state.observaciones,
            fecha: this.state.fecha,
            myImage: this.state.file
            //cheque: this.state.cheque,
            //monto: this.state.monto
        };

        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post('http://localhost:5000/remito/create/', newRemito);
*/
//        e.preventDefault();
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
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
        
    }
    
    onInputChange = (e) => {
    //onChange(e) {
        //this.setState({file:e.target.files[0]});
        this.setState({
            [e.target.name]: e.target.value
        })
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
     <h1 className="mt-4">REMITO</h1>
     <form onSubmit={this.onSubmit}>

         {/* Fecha de Factura */}
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
