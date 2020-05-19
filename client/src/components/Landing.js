import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Manejo Integrado de Plagas</h1>
          </div>
          <div className="row">
          <div className="col-md-3">       
            <div className="card text-white bg-primary mb-3">
              <div className="card-header">Header</div>
              <div className="card-body">
                <h5 className="card-title">Primary card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>  
          <div className="col-md-3">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Header</div>
              <div className="card-body">
                <h5 className="card-title">Secondary card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>  
          <div className="col-md-3">
            <div className="card text-white bg-success mb-3">
              <div className="card-header">Header</div>
              <div className="card-body">
                <h5 className="card-title">Success card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>  
          <div className="col-md-3">       
            <div className="card text-white bg-danger mb-3">
              <div className="card-header">Header</div>
              <div className="card-body">
                <h5 className="card-title">Danger card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>            
          </div>
          </div>

          <div className="row">
          <div className="col-md-3">           
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Warning card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          </div>  
          <div className="col-md-3"> 
          <div className="card text-white bg-info mb-3">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Info card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          </div>  
          <div className="col-md-3"> 
          <div className="card bg-light mb-3">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Light card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          </div>  
          <div className="col-md-3"> 
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Dark card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          </div>
          </div>  
          
          <Link to={"/login"} className="btn btn-primary" title="ingresar al sistema">
              Ingresar
          </Link>
        </div>
      </div>
    )
  }
}

export default Landing
