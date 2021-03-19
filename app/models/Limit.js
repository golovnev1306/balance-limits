const { DataTypes } = require('sequelize')
const sequelize = require('../../config/db')
const Deal = require('../models/Deal')

const Limit = sequelize.define('Limit', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    kvr: {
        type: DataTypes.STRING(3),
        allowNull: false,
    },
    kosgu: {
        type: DataTypes.STRING(3),
        allowNull: false,
    },
	kvfo: {
        type: DataTypes.STRING(1),
        allowNull: false,
    },
	ok: {
        type: DataTypes.STRING(17),
        allowNull: false,
    },
    summ: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {tableName: 'limits', timestamps: false})


module.exports = Limit