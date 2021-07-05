const { DataTypes } = require('sequelize')
const sequelize = require('../../config/db')
const Bill = require('./Bill')

const Deal = sequelize.define('Deal', {

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
        type: DataTypes.TEXT,
        allowNull: false,
    },
    summ: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    partner: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    limit_id: {
        type: DataTypes.INTEGER,
    },
    is_bid: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    economy: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
}, {tableName: 'deals', timestamps: false})


module.exports = Deal