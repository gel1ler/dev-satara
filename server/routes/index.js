const Router = require('express')
const router = new Router()

const brandRouter = require('./brandRouter')
const productRouter = require('./productRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')

router.use('/brand', brandRouter)
router.use('/products', productRouter)
router.use('/type', typeRouter)
router.use('/user', userRouter)
router.use('/basket', basketRouter)

 
module.exports = router