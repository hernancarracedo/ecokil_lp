import React, { Component } from 'react';
import memoize from 'memoize-one';
import DataTable from 'react-data-table-component';

const columns = memoize(clickHandler => [
  {
    name: 'Nombre',
    selector: 'nombre',
    sortable: true,
  },
  {
    name: 'Apellido',
    selector: 'apellido',
    sortable: true,
  },
  {
    name: 'Edad',
    selector: 'edad',
    sortable: true,
    
  },
  {
    cell: (row) => 
     <div>
         <button className="btn-sm btn-light mr-2" onClick={clickHandler} id={row.id} name='deleteButton'><i className="fa fa-trash"></i></button>
         <button className="btn-sm btn-light mr-2" onClick={clickHandler} id={row.id} name='editButton'><i className="fa fa-pencil"></i></button>
         <button className="btn-sm btn-light mr-2" onClick={clickHandler} id={row.id} name='viewButton'><i className="fa fa-search"></i></button>
     </div>,
         ignoreRowClick: true,
         allowOverflow: true,
         //button: true,
         name: 'Acciones',
   },
]);

export default class TablaDatos extends Component {
  state = {
    selectedRows: [],
    tableDataItems: [
        {
            edad: 26,
            id: 3,
            nombre: "Esteban",
            apellido: "Moreno"
        },
        {
            edad: 37,
            id: 2,
            nombre: "Graciela",
            apellido: "Perez"            
        },
        {
            edad: 59,
            id: 1,
            nombre: "Ana",
            apellido: "Gomez"
          },
          {
            edad: 17,
            id: 4,
            nombre: "Claudio",
            apellido: "Narvaez"
        },
        {
            edad: 52,
            id: 5,
            nombre: "Gabriel",
            apellido: "Pereyra"            
        },
        {
            edad: 73,
            id: 6,
            nombre: "Analia",
            apellido: "Miranda"
          },
          {
            edad: 26,
            id: 3,
            nombre: "Esteban",
            apellido: "Moreno"
        },
        {
            edad: 37,
            id: 2,
            nombre: "Graciela",
            apellido: "Perez"            
        },
        {
            edad: 59,
            id: 1,
            nombre: "Ana",
            apellido: "Gomez"
          },
          {
            edad: 17,
            id: 4,
            nombre: "Claudio",
            apellido: "Narvaez"
        },
        {
            edad: 52,
            id: 5,
            nombre: "Gabriel",
            apellido: "Pereyra"            
        },
        {
            edad: 73,
            id: 6,
            nombre: "Analia",
            apellido: "Miranda"
          }          
        ]
  };

  onDelete  = async (id) => {
    //await axios.delete('http://localhost:5000/cliente/delete/' + id);
    //this.getClientes();
    alert("Elegiste BORRAR el ID: " +id);
  }

  handleButtonClick = state => {
    switch(state.target.name) {
      case 'deleteButton':
        this.onDelete(state.target.id);
        break;
      case 'editButton':
        alert("Elegiste EDITAR el ID: " +state.target.id);
        break;
      case 'viewButton':
        alert("Elegiste VISUALIZAR el ID: " +state.target.id);
        break;

      //default:
        //alert('No se ha identificado ningun boton');
    }
  }
  
  handleChange = state => {
    console.log('state', state.selectedRows);
    this.setState({ selectedRows: state.selectedRows });
  }
  render() {
    return (
        <div className="container-fluid">
            <DataTable
                columns={columns(this.handleButtonClick)}
                title="Ejemplo de Tabla"
                data={this.state.tableDataItems}
                
                //columns={columns}
                onSelectedRowsChange={this.handleChange}
                selectableRows
                pagination
            />
         </div>
    );
  }
}
