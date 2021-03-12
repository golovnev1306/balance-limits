const billsController = require('../app/controllers/bills.controller')

module.exports = (express) => {
    const router = express.Router()

    router.get('/', billsController.getAll)
    router.post('/', billsController.add)
    router.delete('/', billsController.delete)
    router.put('/', billsController.update)
    return router
}