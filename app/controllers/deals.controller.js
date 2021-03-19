const {Deal, Limit} = require('../models/index')

module.exports = {
	getAll: async (req, res) => {
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
	},
	add: async (req, res) => {
		const {...values} = req.body
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
	},
	delete: async (req, res) => {
		const {dealId} = req.query
		const isDestroyed = await Deal.destroy({
			where: {
				id: dealId
			}
		})

		res.status(200).json(isDestroyed)
	},
	update: async (req, res) => {
		const {...values} = req.body
		await Deal.update(
			{...values},
			{
				where: {
					id: values.id
				}
			})

		res.status(200).json({isSuccess: true})
	}
}