const { BasketProduct } = require('../models/models')
const ApiError = require('../errors/apiError')

class BasketController {
    async add(req, res) {
        const { productId } = req.body
        const basketProduct = await BasketProduct.create({ productId })
        return res.json(basketProduct)
    }
}

module.exports = new BasketController()