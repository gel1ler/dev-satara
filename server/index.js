//Импорт конфигурационного файла
require('dotenv').config()

//Импорт пакетов
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

//Импорт модулей
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')

//Порт
const PORT = process.env.PORT || 5000

const app = express()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))    
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({message: 'It\'s working'})
})

//Функция запуска сервера
const start = async () => {
    //Попытка подключения к базе данных
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`[SERVER HAS BEEN STARTED ON PORT ${PORT}]`)
        })
    }
    //Обработка ошибок 
    catch (err) {
        console.log('[SERVER ERROR]', err.message)
        process.exit(1)
    }
}

//Запуск сервера
start()