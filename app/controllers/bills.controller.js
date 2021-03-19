const {Bill, Deal, Limit} = require('../models/index')

module.exports = {
    getAll: async (req, res) => {
        const bills = await Bill.findAll({
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
        res.status(200).json(bills)
    },

    add: async (req, res) => {
        const {...values} = req.body
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
    },

    delete: async (req, res) => {
        const {billId} = req.query
        const isDestroyed = await Bill.destroy({
            where: {
                id: billId
            }
        })

        res.status(200).json(isDestroyed)
    },

    update: async (req, res) => {
        const {...values} = req.body

        await Bill.update(
            {...values},
            {
                where: {
                    id: values.id
                }
            })

        res.status(200).json({isSuccess: true})
    }
}