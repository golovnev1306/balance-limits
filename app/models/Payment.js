const { DataTypes } = require('sequelize')
const sequelize = require('../../config/db')

const Payment = sequelize.define('Payment', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    number: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    summ: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    limit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    purpose_of_payment: {
        type: DataTypes.TEXT
    },
    partner: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {tableName: 'payments', timestamps: false})

module.exports = Payment