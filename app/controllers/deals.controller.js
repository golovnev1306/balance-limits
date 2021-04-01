const {Deal, Limit} = require('../models/index')

module.exports = {
    getAll: async (req, res) => {
        try {
            const deals = await Deal.findAll({
                attributes: ['id', 'number', 'date',
                    'product', 'summ',
                    'partner', 'limit_id',
                    'Limit.kvr', 'Limit.kosgu',
                    'Limit.kvfo', 'Limit.ok'
                ],
                include: {
                    model: Limit,
                    attributes: []
                },
                raw: true,
            })
            res.status(200).json(deals)
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }
    },
    add: async (req, res) => {
        const {...values} = req.body
        try {
            const createdDeal = await Deal.create({...values})
            const createdDealWithCodes = await Deal.findOne({
                where: {
                    id: createdDeal.id
                },
                attributes: ['id', 'number', 'date',
                    'product', 'summ',
                    'partner', 'limit_id',
                    'Limit.kvr', 'Limit.kosgu',
                    'Limit.kvfo', 'Limit.ok'
                ],
                include: {
                    model: Limit,
                    attributes: []
                },
                raw: true,
            })
            res.status(201).json(createdDealWithCodes)
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }
    },
    delete: async (req, res) => {
        try {
            const {dealId} = req.query
            const isDestroyed = await Deal.destroy({
                where: {
                    id: dealId
                }
            })

            res.status(200).json(isDestroyed)
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }
    },
    update: async (req, res) => {
        try {
            const {...values} = req.body
            await Deal.update(
                {...values},
                {
                    where: {
                        id: values.id
                    }
                })

            res.status(200).json({isSuccess: true})
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }
    }
}