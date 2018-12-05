const http = require('http'),
      path = require('path'),
      Routing = require('./rutas.js'),
      express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      session = require('express-session');

mongoose.Promise = global.Promise;
const PORT = 3000
const Router = express.Router();
const Users = require('./models/users.js')
const app = express()
const Server = http.createServer(app)


mongoose.connect('mongodb://localhost/pf_agenda_node',{ useNewUrlParser: true })

app.use(morgan("dev"))
app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use(session({
  secret: "JP2017",
  resave: false,
  saveUninitialized: false
}));

//Escucho inicio de sesion
app.post('/login', function(req, res) {
      let email = req.body.email
      let pass = req.body.pass

    Users.findOne({email:email, pass:pass}).exec(function(err, user){
        if (err) {
            res.status(500)
            res.send(err)

        }
        if (user) {

          req.session.email_user = user.email
          console.log(user);
          res.send("Validado")
        }else{res.send("Invalidado")}

    })
})

app.use('/events',Routing)
Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})
