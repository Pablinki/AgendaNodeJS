const Router = require('express').Router();
const Users = require('./models/users.js')
const Events = require('./models/eventos.js')

//Obtener eventos
Router.get('/all', function(req, res) {
  console.log(req.session.email_user);
  if (req.session.email_user) {
    Events.find({fk_usuario: req.session.email_user}).exec(function(err, docs) {
      if (err) {
        res.status(500)
        res.json(err)
      }

      res.json(docs)
    })
  } else res.send("noLogin")

})


//Guardar  evento

Router.post('/new', function(req, res) {
  if (req.session.email_user) {
    let event = new Events({
      //userId: Math.floor(Math.random() * 50),
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      start_hour: req.body.start_hour,
      end_hour: req.body.end_hour,
      fk_usuario: req.session.email_user

    })
    event.save(function(error, doc) {
      if (error) {
        res.status(500)
        res.json(error)
      }
      res.json(doc)
    })

  } else {
    res.send("noLogin")
  }
})




//Agregar usuario
Router.get('/newUser', function(req, res) {
  let user = new Users({
    email: "lp@hotmail.com",
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
// Router.post('/login', function(req, res) {
//       let nombre = req.body.nombre
//       let pass = req.body.pass
//     Users.findOne({nombre:nombre, pass:pass}).exec(function(err, doc){
//         if (err) {
//             res.status(500)
//             res.send(err)
//         }
//         if (doc) {res.json("Validado")}
//         else{res.json("Invalidado")}
//
//     })
// })


// Eliminar un evento
Router.post('/delete/:id', function(req, res) {
  let uid = req.params.id
  Events.deleteOne({
    _id: uid
  }, function(err) {
    if (err) {
      res.status(500)
      res.json(err)
    }
    res.send("Evento eliminado")
  })
})
//Actualizar evento
Router.post('/update', function(req, res) {

  Events.findOneAndUpdate({
    _id: req.body.id
  }, {
    $set: {
      start: req.body.start,
      end: req.body.end,
      end_hour: req.body.end_hour,
      start_hour: req.body.start_hour
    }
  }, function(err) {
    if (err) {
      res.status(500)
      res.send(err)
    }
    res.send("Fecha actualizada")
  })
})

Router.get("/logout", function(req, res) {
  req.session.email_user = false;
  req.session.destroy(function(err) {
    res.send("Adios y gracias!");
  })
});


module.exports = Router
