import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Sidebar extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    window.location.href = '/login';
    //this.props.history.push(`/`)
  }

  render() {
    const loginRegLink = (
          <div>
          <Link to="/login" className="list-group-item list-group-item-action bg-light">
            <i className="fa fa-sign-in"></i> Login
          </Link>
          <Link to="/register" className="list-group-item list-group-item-action bg-light">
          <i className="fa fa-vcard-o"></i> Register
          </Link>
          </div>
    )

    const userLink = (
          <div>
          <Link to="/profile" className="list-group-item list-group-item-action bg-light">
            <i className="fa fa-user"></i> User
          </Link>
          <Link to="/clientes" className="list-group-item list-group-item-action bg-light">
            <i className="fa fa-address-card-o"></i> Clientes
          </Link>
          <Link to="/clienteTipos" className="list-group-item list-group-item-action bg-light">
            <i className="fa fa-th"></i> Clientes Tipos
          </Link>
          <Link to="/saldos" className="list-group-item list-group-item-action bg-light">
            <i className="fa fa-balance-scale"></i> Saldos
            </Link>
          <Link to="/remitos" className="list-group-item list-group-item-action bg-light">
            <i className="fa fa-edit"></i> Remitos

          </Link>
          <a href="" onClick={this.logOut.bind(this)} className="list-group-item list-group-item-action bg-light">
            <i className="fa fa-power-off"></i>  Logout
          </a>
          </div>
    )

    return (
      <div>
      <div className="sidebar-heading text-success">
      <img src="img/letra.png" height="25px;" alt="imagen de perfil"  />
      </div>
      <div className="list-group list-group-flush">
        <Link to="/" className="list-group-item list-group-item-action bg-light">
          <i className="fa fa-home"></i>  Home
        </Link>

        {localStorage.usertoken ? userLink : loginRegLink}

      </div>
      </div>
    )
  }
}

export default withRouter(Sidebar)