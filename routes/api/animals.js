const router = require('express').Router()
const animalCtrl = require('../../controllers/api/animals')

/* /api/animals/:id
DELETE
destroy animal
*/
router.delete('/:id', animalCtrl.destroyAnimal, animalCtrl.respondWithAnimal)
/*
/api/animals/:id
PUT
update animal
*/
router.put('/:id', animalCtrl.updateAnimal, animalCtrl.respondWithAnimal)
/*
/api/animals
POST
create animal
*/
router.post('/', animalCtrl.createAnimal, animalCtrl.respondWithAnimal)

module.exports = router