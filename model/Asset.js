const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/bd');

const Asset = sequelize.define('Asset', {
  assetId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  currentPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'Assets',
  timestamps: false
});

module.exports = Asset;
