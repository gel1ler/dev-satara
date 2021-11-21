const ApiError = require('../errors/apiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')

const generateJwt = (id, email, role, firstName, lastName) => {
    return jwt.sign(
        { id, email, role, firstName, lastName },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async registration(req, res, next) {
        const { email, password, role, firstName, lastName } = req.body
        console.log(email)
        if (!email || !password || !firstName || !lastName) {
            return next(ApiError.badRequest('Некоректный e-mail или пароль'))
        }

        const candidate = await User.findOne({ where: { email } })

        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким e-mail уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword, firstName, lastName })
        const basket = await Basket.create({ userId: user.id })
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.firstName, user.lastName, user.firstName, user.lastName )
        return res.json({ token })
    }

    async check(req, res, next) {
        return res.json({succes: !!req.user })
    }

    async getOne(req, res, next) {
        const { email } = req.params
        const user = await User.findOne(
            {
                where: { email }
            }
        )
        return res.json(user)
    }
}

module.exports = new UserController()