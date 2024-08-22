const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/bd');
const InvestmentAccount = require('./InvestmentAccount');
const Asset = require('./Asset');

const Transaction = sequelize.define('Transaction', {
  transactionId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM('comprar', 'vender', 'transferir'),
    allowNull: false
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'Transactions',
  timestamps: true
});

Transaction.belongsTo(InvestmentAccount, { foreignKey: 'accountId' });
Transaction.belongsTo(Asset, { foreignKey: 'assetId' });

module.exports = Transaction;
