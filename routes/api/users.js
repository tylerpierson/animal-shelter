const router = require('express').Router()
const userCtrl = require('../../controllers/api/users')

/*
/api/users
SignUp
*/
router.post('/', userCtrl.signUp, userCtrl.respondWithToken)
/*
/api/users/login
Login
*/
router.post('/login', userCtrl.login, userCtrl.respondWithToken)
/*
/api/users/animals
Get Animals By User
*/
router.get('/animals', userCtrl.getAnimalsByUser, userCtrl.respondWithAnimals)

module.exports = router