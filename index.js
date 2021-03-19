const express = require('express')
const routers = require('./routers/index')
const db = require('./config/db')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const config = require('./config/config')
const app = express()

app.use(cors())
app.use(fileUpload())

const start = async () => {
    try {
        await db.authenticate()
        console.log('Проверка бд прошла успешно')
        const PORT = config.port

        app.use(express.json())
        app.use('/api/limits', routers.limits(express))
        app.use('/api/deals', routers.deals(express))
        app.use('/api/bills', routers.bills(express))
        app.use('/api/payments', routers.payments(express))

        app.use(function (req, res) {
            res.status(404).json({message: 'По адресу ничего нет', isSuccess: false})
        })

        app.listen(PORT, () => console.log("Прослушивание сервера было начато на порту", PORT))

    } catch (error) {
        console.error('Упс, ошибка при проверке бд:', error)
    }

}


start();