const { Product, ProductInfo } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../errors/apiError')

class ProductController {
    async create(req, res, next) {
        try {
            const { name, price, oldPrice, brandId, typeId, description } = req.body
            const { img } = req.files
            let filename = uuid.v4() + '.jpeg'
            img.mv(path.resolve(__dirname, '..', 'static', filename))
            const product = await Product.create({ name, price, oldPrice, description, brandId, typeId, img: filename })
            console.log(res.json(product))
            return res.json(product)
        }
        catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getAll(req, res) {
        let { brandId, typeId } = req.body
        let products
        if (!brandId && !typeId) {
            products = await Product.findAll()
        }
        if (brandId && !typeId) {
            products = await Product.findAll({ where: { brandId } })
        }
        if (!brandId && typeId) {
            products = await Product.findAll({ where: { typeId } })
        }
        if (brandId && typeId) {
            products = await Product.findAll({ where: { brandId, typeId } })
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const { id } = req.params
        const product = await Product.findOne(
            {
                where: { id }
            }
        )
        return res.json(product)
    }

    async delete(req, res) {
        const { id } = req.params
        console.log(id)
        await Product.destroy(
            {
                where: { id }
            }
        )
    }
}

module.exports = new ProductController()