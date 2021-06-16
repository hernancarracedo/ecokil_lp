import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      errors: {}
    }
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

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-8 offset-md-2">
        <h1 className="mt-4">
          <i className="fa fa-user mr-3 text-primary"></i>
          Profile
        </h1>
          <table className="table col-md-12 mx-auto">
            <tbody>
              <tr>
                <td>Nombre</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Apellido</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
          </div>
      </div>
    )
  }
}

export default Profile
