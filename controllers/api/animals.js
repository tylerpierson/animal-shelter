const Animal = require('../../models/animal')


module.exports = {
    create,
    index,
    show,
    update,
    destroy,
    jsonAnimals,
    jsonAnimal
}

// jsonTodos jsonTodo
// viewControllers

function jsonAnimal (_, res) {
    res.json(res.locals.data.animal)
}

function jsonAnimals (_, res) {
    res.json(res.locals.data.animals)
}

/****** C - Create *******/
async function create(req, res, next){
    try {
        req.body.user = req.user._id
        const animal = await Animal.create(req.body) //{ title, body, user }
        req.user.animals.addToSet(animal)
        req.user.save()
        res.locals.data.animal = animal
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

/****** R - Read *****/

async function index(_, res ,next) {
    try {
        const animals = await Animal.find({})
        res.locals.data.animals = animals
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


async function show(req ,res,next) {
    try {
        const animal = await Animal.findById(req.params.id)
        res.locals.data.animal = animal
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


/****** U - Update *****/


async function update(req ,res,next) {
    try {
        const animal = await Animal.findOneAndUpdate({_id : req.params.id,  user: req.user._id}, req.body, { new: true })
        res.locals.data.animal = animal
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

/***** D - destroy/delete *****/

async function destroy(req ,res,next) {
    try {
        const animal = await Animal.findOneAndDelete({_id : req.params.id,  user: req.user._id})
        req.user.animals.pull(animal)
        req.user.save()
        res.locals.data.animal = Animal
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}