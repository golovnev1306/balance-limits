const { DataTypes } = require('sequelize')
const sequelize = require('../../config/db')
const Bill = require('./Bill')

const Deal = sequelize.define('deal', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    number: {
        type: DataTypes.STRING(15)
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    product: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    summ: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    partner: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    limit_id: {
        type: DataTypes.INTEGER,
    }
}, {timestamps: false})

Deal.hasMany(Bill, {foreignKey: 'deal_id', onDelete: 'cascade'})

module.exports = Deal