const {Bill, Deal, Limit} = require('../models/index')

module.exports = {
    getAll: async (req, res) => {
        try {
            const bills = await Bill.findAll({
                attributes: [
                    'id', 'number', 'date', 'summ', 'deal_id', 'Deal.Limit.kvr', 'Deal.Limit.kosgu',
                    'Deal.Limit.kvfo', 'Deal.Limit.ok', 'Deal.partner'
                ],
                include: [{
                    model: Deal,
                    attributes: [],
                    include: {
                        model: Limit,
                        attributes: [],
                    }
                }],
                raw: true
            })
            res.status(200).json(bills)
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }

    },

    add: async (req, res) => {
        const {...values} = req.body
        try {
            const createdBill = await Bill.create({...values},
                {
                    attributes: [
                        'id', 'number', 'date', 'summ', 'deal_id', 'Deal.Limit.kvr', 'Deal.Limit.kosgu',
                        'Deal.Limit.kvfo', 'Deal.Limit.ok', 'Deal.partner'
                    ],
                    include: {
                        model: Deal,
                        attributes: [],
                        include: {
                            model: Limit,
                            attributes: [],
                        }
                    },
                    raw: true
                })
            const createdBillWithCodes = await Bill.findOne({
                where: {
                    id: createdBill.id
                },
                attributes: [
                    'id', 'number', 'date', 'summ', 'deal_id', 'Deal.Limit.kvr', 'Deal.Limit.kosgu',
                    'Deal.Limit.kvfo', 'Deal.Limit.ok', 'Deal.partner'
                ],
                include: {
                    model: Deal,
                    attributes: [],
                    include: {
                        model: Limit,
                        attributes: [],
                    }
                },
                raw: true,
            })
            res.status(201).json(createdBillWithCodes)
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }
    },

    delete: async (req, res) => {
        const {billId} = req.query
        try {
            const isDestroyed = await Bill.destroy({
                where: {
                    id: billId
                }
            })
            res.status(200).json(isDestroyed)
        } catch (error) {
            res.status(400).json({messageBody: `Ошибка при запросе к бд: \n${error}`})
        }

    },

    update: async (req, res) => {
        const {...values} = req.body
        try {
            await Bill.update(
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