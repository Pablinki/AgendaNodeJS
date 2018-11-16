const mongoose = require('mongoose')

const Schema = mongoose.Schema



let AgendaSchema = new Schema({
  //eventId: { type: Number, required: true, unique: true},
  title: { type: String, required: true },
  start: { type: String},
  end: { type: String},
  start_hour: { type: String},
  end_hour: { type: String}

})

let AgendaModel = mongoose.model('eventos', AgendaSchema)


module.exports = AgendaModel
