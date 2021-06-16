
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import axios from 'axios';
import memoize from 'memoize-one';
//import DataTable , { memoize } from 'react-data-table-component';
import DataTable from 'react-data-table-component';



const columns = memoize(clickHandler => [
  {
    cell:(row) => <button onClick={clickHandler} id={row.ID}>Action</button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
  {
    name: 'ID',
    selector: 'ID',
    sortable: true,
    grow: 2,
  },
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
    grow: 2,
  },
  {
    name: 'Class',
    selector: 'class',
    sortable: true,
  },

]);
const viewQuery ="SELECT ID,name,class FROM school ";

class DTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewdata:
                [
                    {
                        ID: 11,
                        name: "Juan",
                        class: "Matematica"
                    },
                    {
        
                        ID: 22,
                        name: "Clara",
                        class: "Geografia"            
                    },
                    {
                        ID: 33,
                        name: "Rene",
                        class: "Literatura"
                      }
                    ]
            ,
            loading:false,
            selectedRows: []

        };
      }
  viewData(){

    axios({
      method: 'post',
      url: '',
      data: {query:viewQuery},
      crossDomain: true,
      headers: {
          'Content-type': 'multipart/form-data'
        }
      })
      .then(response => {
         //this.setState({ viewdata: response.data });
         
         //console.log(response)
        })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
  } 
 componentDidMount() {
       this.viewData();

 }
 handleButtonClick = (state) => {
    console.log('clicked');
    console.log(state.target.id);
  };
  handleChange = state => {
    console.log('state', state.selectedRows);

    this.setState({ selectedRows: state.selectedRows });
  };
  render(){
  return (

                <DataTable
                title="Created Form"

                data={this.state.viewdata}
                columns={columns(this.handleButtonClick)}
                onRowSelected={this.handleChange}
                selectableRows
                pagination
                dense
                />
          
  );
}
}
export default DTable;