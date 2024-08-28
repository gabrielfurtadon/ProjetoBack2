const InvestmentAccount = require('../model/InvestmentAccount');
const TransactionService = require('./TransactionService');
const User = require('./UserService')

module.exports = {
    createInvestmentAccount: async function(codigo) {
        const user = await User.getById(codigo);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        let account = await InvestmentAccount.findOne({ where: { codigo } });
        if (account) {
            throw new Error('O usuário já possui uma conta de investimento');
        }

        account = await InvestmentAccount.create({
            codigo: codigo,
            balance: 1000
        });

        return account;
    },
    getBalance: async function(codigo) {
        const account = await InvestmentAccount.findOne({ where: { codigo } });
        if (!account) {
            throw new Error('Conta de investimento não encontrada');
        }
        return account.balance;
    },

    getTransactionHistory: async function(codigo) {
        return await TransactionService.getTransactionHistory(codigo);
    }
};