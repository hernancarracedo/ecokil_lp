import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Sidebar extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
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
            <i className="fa fa-caret-down"></i> Clientes Tipos
          </Link>
          <a href="" onClick={this.logOut.bind(this)} className="list-group-item list-group-item-action bg-light">
            <i className="fa fa-power-off"></i>  Logout
          </a>
          </div>
    )

    return (
      <div>
      <div className="sidebar-heading">ECOKIL </div>
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