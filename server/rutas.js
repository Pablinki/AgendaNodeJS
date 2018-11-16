const Router = require('express').Router();
const Users = require('./models/users.js')
const Events = require('./models/eventos.js')

//Obtener eventos
Router.get('/all', function(req, res) {
    Events.find({}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
})


//Guardar  evento
Router.post('/new', function(req, res) {
    let event = new Events({
        //userId: Math.floor(Math.random() * 50),
        title: req.body.title,
        start: req.body.start,
        end: req.body.end

    })
    event.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Evento guardado")
    })
})


//Agregar usuario
Router.get('/newUser', function(req, res) {
    let user = new Users({
			nombre: "jpp",
			pass: "1234"
	})
	user.save(function(error) {
        if (error) {
            res.status(500)
            res.send(error)
        }
        res.send("Guardado")
    })
})

// Valida a un usuario
Router.post('/login', function(req, res) {
      let nombre = req.body.nombre
      let pass = req.body.pass
    Users.findOne({nombre:nombre, pass:pass}).exec(function(err, doc){
        if (err) {
            res.status(500)
            res.send(err)
        }
        if (doc) {res.json("Validado")}
        else{res.json("Invalidado")}

    })
})


// Eliminar un evento
Router.get('/delete/:id', function(req, res) {

    Events.remove({_id: req.params.id}, function(err) {
      if(err){
        res.status(500)
        res.send(error)
      }
    res.send("Evento eliminado")
    })
})
//Actualizar evento
Router.post('/update', function (req, res) {

  Events.findByIdAndUpdate({_id:req.body.id},{$set:{start:req.body.start,end:req.body.end, end_hour:req.body.end_hour,start_hour:req.body.start_hour}}, function (err) {
    if(err){
      res.status(500)
      res.send(err)
    }
    res.send("Fecha actualizada")
  })
})

Router.get("/logout", function (req,res){
	req.session.nombre= false;
	req.session.destroy(function(err) {
  			res.send("adios");
	})
});


module.exports = Router
