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


// rutas que voy agregando. HC.-
app.use(require('./routes/cliente'));
app.use(require('./routes/clienteTipo'));

// routes
//app.use('/cliente', require('./routes/cliente'));
//app.use('/clienteTipo', require('./routes/clienteTipo'));


app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
