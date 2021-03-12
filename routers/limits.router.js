const limitsController = require('../app/controllers/limits.controller')

module.exports = (express) => {
    const router = express.Router()

    router.get('/', limitsController.getAll)
    router.post('/', limitsController.add)
    router.delete('/', limitsController.delete)
    router.put('/', limitsController.update)
    return router
}