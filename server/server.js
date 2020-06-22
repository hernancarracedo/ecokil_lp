var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Users = require('./routes/Users')
app.use('/users', Users)

app.use(require('./routes/cliente'));
app.use(require('./routes/clienteTipo'));
app.use(require('./routes/sucursal'));
app.use(require('./routes/factura'));
app.use(require('./routes/pago'));
app.use(require('./routes/saldos'));
app.use(require('./routes/detalleCuenta'));
app.use(require('./routes/monitoreo'));
app.use(require('./routes/referencias'));
app.use(require('./routes/plano'));
app.use(require('./routes/remito'));


// routes
//app.use('/cliente', require('./routes/cliente'));
//app.use('/clienteTipo', require('./routes/clienteTipo'));


app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
