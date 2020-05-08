import React, { Component } from 'react'
//import jwt_decode from 'jwt-decode'

class Topbar extends Component {

  state = {
      first_name: '',
      last_name: '',
      email: ''
  }
/**
  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    })
  }
*/
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button className="btn btn-primary" id="menu-toggle">Toggle Menu</button>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.email}
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="">Action</a>
                <a className="dropdown-item" href="">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="">Something else here</a>
              </div>
            </li>
            <li>
              <img src="./img/profile.jpg" alt="imagen de perfil" className="rounded-circle" />
              
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Topbar