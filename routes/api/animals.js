const router = require('express').Router()
const animalCtrl = require('../../controllers/api/animals')
const checkToken = require('../../config/checkToken')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

/* /api/animals/:id
DELETE
destroy animal
*/
router.delete('/:id', checkToken, ensureLoggedIn, animalCtrl.destroyAnimal, animalCtrl.respondWithAnimal)
/*
/api/animals/:id
PUT
update animal
*/
router.put('/:id', checkToken, ensureLoggedIn, animalCtrl.updateAnimal, animalCtrl.respondWithAnimal)
/*
/api/animals
POST
create animal
*/
router.post('/', checkToken, ensureLoggedIn, animalCtrl.createAnimal, animalCtrl.respondWithAnimal)

module.exports = router