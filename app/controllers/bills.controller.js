const Bill = require('../models/Bill')

module.exports = {
	getAll: async (req, res) => {
		const bills = await Bill.findAll({
			raw: true
		})
		bills.map(bill => {
			return bill.deal_id === null ? -1 : bill.deal_id
		})
		res.status(200).json(bills)
	},
	add: async (req, res) => {
		const {...values} = req.body
		if (!((values.summ instanceof Number||typeof values.summ === 'number') && !isNaN(values.summ))) {
			values.summ = parseFloat(values.summ.replace(',', '.'))
		}
		values.deal_id = (values.deal_id === -1) ? null : values.deal_id
		const createdBill = await Bill.create({...values})
		createdBill.deal_id = createdBill.deal_id === null ? -1 : createdBill.deal_id
		res.status(201).json(createdBill)
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
		if (!((values.summ instanceof Number||typeof values.summ === 'number') && !isNaN(values.summ))) {
			values.summ = parseFloat(values.summ.replace(',', '.'))
		}
		values.deal_id = (values.deal_id === -1) ? null : values.deal_id
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