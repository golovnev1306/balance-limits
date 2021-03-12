const Deal = require('../models/Deal')

module.exports = {
	getAll: async (req, res) => {
		const deals = await Deal.findAll({
			raw: true
		})
		deals.map(deal => {
			deal.limit_id =  (deal.limit_id === null) ? (-1) : deal.limit_id
		})
		res.status(200).json(deals)
	},
	add: async (req, res) => {
		const {...values} = req.body
		if (!((values.summ instanceof Number||typeof values.summ === 'number') && !isNaN(values.summ))) {
			values.summ = parseFloat(values.summ.replace(',', '.'))
		}

		values.limit_id = (values.limit_id === -1) ? null : values.limit_id
		const createdDeal = await Deal.create({...values})
		createdDeal.limit_id = createdDeal.limit_id === null ? -1 : createdDeal.limit_id
		res.status(201).json(createdDeal)
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
		if (!((values.summ instanceof Number||typeof values.summ === 'number') && !isNaN(values.summ))) {
			values.summ = parseFloat(values.summ.replace(',', '.'))
		}
		values.limit_id = (values.limit_id === -1) ? null : values.limit_id
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