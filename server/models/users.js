const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
  //userId: { type: Number, required: true, unique: true},
  email: { type: String, required: true },
  nombre: { type: String, required: false },
  pass: { type: String, required: true}

})

let UserModel = mongoose.model('usuarios', UserSchema)

module.exports = UserModel
