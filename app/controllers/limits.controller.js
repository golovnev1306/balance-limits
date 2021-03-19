const {Limit} = require('../models/index')
const db = require('../../config/db')

module.exports = {
    getAll: async (req, res) => {

        const limits = await Limit.findAll({
            attributes: ['id', 'name', 'kvr', 'kosgu', 'kvfo', 'ok', 'summ'
            ]
        })
        res.status(200).json(limits)
    },
    add: async (req, res) => {
        const {...values} = req.body
        const createdLimit = await Limit.create({...values})

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