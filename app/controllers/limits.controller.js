const Limit = require('../models/Limit')
const Deal = require('../models/Deal')
const db = require('../../config/db')

module.exports = {
    getAll: async (req, res) => {

        const limits = await Limit.findAll({
            attributes: ['id', 'name', 'kvr', 'kosgu', 'kvfo', 'ok', 'summ',
                [db.fn('SUM', db.col('deals.summ')), 'balance'],
            ],
            include:
                {
                    model: Deal
                },
            group: ['id']
        })
        res.status(200).json(limits)
    },
    add: async (req, res) => {
        const {...values} = req.body
        if (!((values.summ instanceof Number||typeof values.summ === 'number') && !isNaN(values.summ))) {
            values.summ = parseFloat(values.summ.replace(',', '.'))
        }
        const createdLimit = await Limit.create({...values})
        createdLimit.dataValues.balance = 0
        res.status(201).json(createdLimit)
    },
    delete: async (req, res) => {
        const {limitId} = req.query
        const isDestroyed = await Limit.destroy({
            where: {
                id: limitId
            }
        })

        res.status(200).json(isDestroyed)
    },
    update: async (req, res) => {
        const {...values} = req.body
        if (!((values.summ instanceof Number||typeof values.summ === 'number') && !isNaN(values.summ))) {
            values.summ = parseFloat(values.summ.replace(',', '.'))
        }
        await Limit.update(
            {...values},
            {
                where: {
                    id: values.id
                }
            })

        res.status(200).json({isSuccess: true})
    }
}