const {Limit} = require('../models/index')
const db = require('../../config/db')

module.exports = {
    getAll: async (req, res) => {
        try {
            const limits = await Limit.findAll({
                attributes: ['id', 'name', 'kvr', 'kosgu', 'kvfo', 'ok', 'summ'
                ]
            })
            res.status(200).json(limits)
        } catch (error) {
            res.status(400).json(`Ошибка при запросе к бд: \n${error}`)
        }
    },
    add: async (req, res) => {
        const {...values} = req.body
        try {
            const createdLimit = await Limit.create({...values})

            res.status(201).json(createdLimit)
        } catch (error) {
            res.status(400).json(`Ошибка при запросе к бд: \n${error}`)
        }
    },
    delete: async (req, res) => {
        const {limitId} = req.query
        try {
            const isDestroyed = await Limit.destroy({
                where: {
                    id: limitId
                }
            })
            res.status(200).json(isDestroyed)

        } catch (error) {
            res.status(400).json(`Ошибка при запросе к бд: \n${error}`)
        }
    },
    update: async (req, res) => {
        const {...values} = req.body
        try {
            await Limit.update(
                {...values},
                {
                    where: {
                        id: values.id
                    }
                })

            res.status(200).json({isSuccess: true})
        } catch (error) {
            res.status(400).json(`Ошибка при запросе к бд: \n${error}`)
        }
    }
}