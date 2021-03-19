const paymentsController = require('../app/controllers/payments.controller')

module.exports = (express) => {
    const router = express.Router()

    router.get('/', paymentsController.getAll)
    router.post('/', paymentsController.add)
    router.post('/import', paymentsController.import)
    router.delete('/', paymentsController.delete)
    router.put('/', paymentsController.update)
    return router
}