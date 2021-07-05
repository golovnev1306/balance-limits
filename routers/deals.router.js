const dealsController = require('../app/controllers/deals.controller')

module.exports = (express) => {
    const router = express.Router()

    router.get('/', dealsController.getAll)
    router.post('/', dealsController.add)
    router.delete('/', dealsController.delete)
    router.put('/', dealsController.update)
    router.post('/importEconomy', dealsController.importEconomy)
    router.get('/download', dealsController.download)
    router.delete('/deleteFile', dealsController.deleteFile)
    router.get('/checkFile', dealsController.checkFile)
    return router
}