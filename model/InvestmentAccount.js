const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/bd');
const User = require('./User');

const InvestmentAccount = sequelize.define('InvestmentAccount', {
  accountId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0
  }
}, {
  tableName: 'InvestmentAccounts',
  timestamps: false
});

InvestmentAccount.belongsTo(User, { foreignKey: 'codigo' });
User.hasOne(InvestmentAccount, { foreignKey: 'codigo' });

module.exports = InvestmentAccount;
