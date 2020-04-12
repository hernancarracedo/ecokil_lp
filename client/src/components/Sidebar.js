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
            Login
          </Link>
          <Link to="/register" className="list-group-item list-group-item-action bg-light">
            Register
          </Link>
          </div>
    )

    const userLink = (
          <div>
          <Link to="/profile" className="list-group-item list-group-item-action bg-light">
            User
          </Link>
          <Link to="/clientes" className="list-group-item list-group-item-action bg-light">
            Clientes
          </Link>
          <a href="" onClick={this.logOut.bind(this)} className="list-group-item list-group-item-action bg-light">
            Logout
          </a>
          </div>
    )

    return (
      <div>
      <div className="sidebar-heading">ECOKIL </div>
      <div className="list-group list-group-flush">
        <Link to="/" className="list-group-item list-group-item-action bg-light">
          Home
        </Link>

        {localStorage.usertoken ? userLink : loginRegLink}

      </div>
      </div>
    )
  }
}

export default withRouter(Sidebar)