import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

//import Navbar from './components/Navbar'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Clientes from './components/Clientes'
import Cliente from './components/Cliente'
import Factura from './components/Factura'
import Pago from './components/Pago'
import Saldos from './components/Saldos'
import DetalleCuenta from './components/DetalleCuenta'
import ClienteTipos from './components/ClienteTipos'
import ClienteTipo from './components/ClienteTipo'
import Monitoreo from './components/Monitoreo'
import Planos from './components/Planos'
import Plano from './components/Plano'
import CanvasB from './components/CanvasB'
import CanvasC from './components/CanvasC'
import Remito from './components/Remito'
import Remitos from './components/Remitos'
import ClienteSucursalSelector from './components/ClienteSucursalSelector'

import SelectSearchTopReverse from './components/Tabla'

import OptimizedClass from './components/tabla3'
import DTable from './components/Tabla4'
import TablaDatos from './components/Tabla5'

//import Canvas from './components/Canvas'

class App extends Component {
  render() {
    const loginLayout = ( 
            <div className="d-flex" id="wrapper">
              <div className="bg-light border-right" id="sidebar-wrapper">
                <Sidebar />
              </div>


              <div id="page-content-wrapper">

                <Topbar />

                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={Profile} />

                <Route exact path="/clientes" component={Clientes} />
                <Route exact path="/cliente" component={Cliente} />            
                <Route exact path="/clienteUpdate/:id" component={Cliente} />

                <Route exact path="/factura" component={Factura} />            
                <Route exact path="/facturaUpdate/:id" component={Factura} />        
                <Route exact path="/pago" component={Pago} />            
                <Route exact path="/pagoUpdate/:id" component={Pago} />       
                <Route exact path="/saldos" component={Saldos} />      
                <Route exact path="/detalleCuenta/:id" component={DetalleCuenta} />   

                <Route exact path="/clienteTipos" component={ClienteTipos} />
                <Route exact path="/clienteTipo" component={ClienteTipo} />
                <Route exact path="/clienteTipoUpdate/:id" component={ClienteTipo} />

                <Route exact path="/dispositivosMonitoreo/:id" component={Monitoreo} />

                <Route exact path="/Planos/:id" component={Planos} />
                <Route exact path="/Plano" component={Plano} />
                <Route exact path="/CanvasB" component={CanvasB} />
                <Route exact path="/CanvasC" component={CanvasC} />
           
                <Route exact path="/remito" component={Remito} />
                <Route exact path="/remitos" component={Remitos} />

                <Route exact path="/tabla" component={SelectSearchTopReverse} />        
                <Route exact path="/tabla3" component={OptimizedClass} />   
                <Route exact path="/tabla4" component={DTable} />  
                <Route exact path="/tabla5" component={TablaDatos} />

                <Route exact path="/ClienteSucursalSelector" component={ClienteSucursalSelector} />  

              </div>
            </div>
    )
     
    const notLoginLayout = ( 
            <div className="d-flex" id="wrapper">
              <div id="page-content-wrapper">
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={Login} />
              </div>
            </div>
      )
      

    return (
      <Router>
        <div className="App">

          {localStorage.usertoken ? loginLayout : notLoginLayout}

        </div>
      </Router>
    )
  }
}

export default App
