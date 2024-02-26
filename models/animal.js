const { model, Schema } = require('mongoose')


const animalSchema = new Schema ({
    title: String,
    body: String,
    user: { type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

module.exports = model('Animal', animalSchema)