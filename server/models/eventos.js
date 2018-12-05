const mongoose = require('mongoose')

const Schema = mongoose.Schema



let AgendaSchema = new Schema({
  //eventId: { type: Number, required: true, unique: true},
  title: { type: String, required: true },
  start: { type: String, required: true},
  end: { type: String, required: false},
  start_hour: { type: String, required: false},
  end_hour: { type: String, required: false},
  fk_usuario: {type: String, required: false }

})



let AgendaModel = mongoose.model('eventos', AgendaSchema)


module.exports = AgendaModel
