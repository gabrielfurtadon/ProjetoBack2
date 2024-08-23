const Transaction = require('../model/Transaction');
const InvestmentAccount = require('../model/InvestmentAccount');
const Asset = require('../model/Asset');

module.exports = {
    buyAsset: async function(codigo, assetId, quantity) {
        const account = await InvestmentAccount.findOne({ where: { codigo } });
        const asset = await Asset.findByPk(assetId);

        const totalCost = quantity * asset.currentPrice;
        if (account.balance < totalCost) {
            throw new Error('Saldo insuficiente');
        }

        account.balance -= totalCost;
        await account.save();

        const transaction = await Transaction.create({
            accountId: account.accountId,
            assetId: asset.assetId,
            type: 'comprar',
            quantity: quantity,
            price: asset.currentPrice
        });

        return transaction;
    },

    sellAsset: async function(codigo, assetId, quantity) {
        const account = await InvestmentAccount.findOne({ where: { codigo } });
        const asset = await Asset.findByPk(assetId);

        const totalRevenue = quantity * asset.currentPrice;
        account.balance += totalRevenue;
        await account.save();

        const transaction = await Transaction.create({
            accountId: account.accountId,
            assetId: asset.assetId,
            type: 'vender',
            quantity: quantity,
            price: asset.currentPrice
        });

        return transaction;
    },

    getTransactionHistory: async function(codigo) {
        const account = await InvestmentAccount.findOne({ where: { codigo } });
        return await Transaction.findAll({ where: { accountId: account.accountId } });
    }
};