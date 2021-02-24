const limitsController = require('../app/controllers/limits.controller')

module.exports = (express) => {
    const router = express.Router()

    router.get('/', limitsController.getAll)
    return router
}