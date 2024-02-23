const { Schema, model } = require('mongoose')

const animalSchema = new Schema({
    name: String,
    species: String,
    image: String,
    reservedForAdoption: Boolean
}, {
  timestamps: true
})

module.exports = model('Animal', animalSchema)