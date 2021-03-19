const Limit =  require('./Limit')
const Deal =  require('./Deal')
const Bill =  require('./Bill')
const Payment = require('./Payment')

Limit.hasMany(Deal, {foreignKey: 'limit_id', onDelete: 'cascade'})
Limit.hasMany(Payment, {foreignKey: 'limit_id', onDelete: 'cascade'})
Deal.hasMany(Bill, {foreignKey: 'deal_id', onDelete: 'cascade'})
Deal.belongsTo(Limit, {foreignKey: 'limit_id'})
Bill.belongsTo(Deal, {foreignKey: 'deal_id'})
Payment.belongsTo(Limit, {foreignKey: 'limit_id'})


module.exports = {
    Limit, Deal, Bill, Payment
}