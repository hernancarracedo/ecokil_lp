import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'

class Topbar extends Component {

  state = {
      first_name: '',
      last_name: '',
      email: ''
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    })
  }

  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    window.location.href = '/login';
    //this.props.history.push(`/`)
  }

  render() {
    var avatar = {
        width : '40px',
        height : '40px'
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button className="btn btn-primary" id="menu-toggle"><i className="fa fa-exchange"></i> Menu</button>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                <i className="fa fa-home"></i>  Home
             </Link>  
            </li>
            {/**<li className="nav-item">}
              </ul><a className="nav-link" href="">Link</a>
            </li>**/}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.first_name} {this.state.last_name}
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <Link to="/profile" className="dropdown-item">
                  <i className="fa fa-user"></i> Datos Perfil
                </Link>
                <Link to="/register" className="dropdown-item">
                  <i className="fa fa-key"></i> Nuevo Usuario
                </Link>
                <div className="dropdown-divider"></div>
                {/**<a className="dropdown-item" href="">Something else here</a>*/}
                <a href="" onClick={this.logOut.bind(this)} className="dropdown-item">
                  <i className="fa fa-power-off"></i> Logout
                </a>
              </div>
            </li>
            <li>

              <img src="/img/profile3.jpg" style={avatar} alt="imagen de perfil" className="rounded-circle" />

            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Topbar