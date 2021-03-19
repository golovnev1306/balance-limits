const { DataTypes } = require('sequelize')
const sequelize = require('../../config/db')

const Bill = sequelize.define('Bill', {

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
    deal_id: {
        type: DataTypes.INTEGER,
    }
}, {tableName: 'bills', timestamps: false})

module.exports = Bill