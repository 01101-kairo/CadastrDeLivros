const mongoose = require('./../config/mongo')
const {Schema} = mongoose

const livroSchema = new Schema({
  titul: String,
  paginas: Number,
  ISBN: String,
  Editora: String
})

const LivroModel = mongoose.model('livros', livroSchema)
module.exports = LivroModel
