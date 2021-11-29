const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/add', basketController.add)

module.exports = router