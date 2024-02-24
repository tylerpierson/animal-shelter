require('dotenv').config()
const Animal = require('../../models/animal')
const User = require('../../models/user')

// delete animal
// create animal
// update animal

const destroyAnimal = async (req, res, next) => {
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(req.params.id)
    const user = await User.findOne({ email: res.locals.data.email })
    user.animals.pull(deletedAnimal)
    await user.save()
    res.locals.data.animal = deletedAnimal
    next()
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

const updateAnimal = async (req, res, next) => {
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.locals.data.animal = updatedAnimal
    next()
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

const createAnimal = async (req, res, next) => {
  try {
    const createdAnimal = await Animal.create(req.body)
    const user = await User.findOne({ email: res.locals.data.email })
    user.animals.addToSet(createdAnimal)
    await user.save()
    res.locals.data.animal = createdAnimal
    next()
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

const respondWithAnimal = (req, res) => {
  res.json(res.locals.data.animal)
}

module.exports = {
  destroyAnimal,
  updateAnimal,
  createAnimal,
  respondWithAnimal
}