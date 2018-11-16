const http = require('http'),
      path = require('path'),
      Routing = require('./rutas.js'),
      express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const PORT = 3000
const app = express()

const Server = http.createServer(app)

mongoose.connect('mongodb://localhost/pf_agenda_node')


app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/events',Routing)

Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})
