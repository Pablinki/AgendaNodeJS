const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
  //userId: { type: Number, required: true, unique: true},
  nombre: { type: String, required: true },
  pass: { type: String, required: true}

})

let UserModel = mongoose.model('usuarios', UserSchema)

module.exports = UserModel
