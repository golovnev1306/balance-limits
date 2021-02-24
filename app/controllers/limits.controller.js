const Limit = require('../models/Limit')

module.exports = {
	getAll: async (req, res) => {
		
		const limits = await Limit.findAll()
		res.status(200).json(limits)
	}
}