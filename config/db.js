const { Sequelize } = require('sequelize')
const config = require('./config')

module.exports = new Sequelize(
	config.db.name, 
	config.db.username, 
	config.db.password, {
		host: config.db.host,
		dialect: config.db.type
	}
);