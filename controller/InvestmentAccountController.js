const express = require('express');
const router = express.Router();
const InvestmentAccountService = require('../service/InvestmentAccountService');
const { validaAcesso } = require("../helpers/Auth.js");
const UserService = require('../service/UserService')

router.post('/create/:codigo', validaAcesso,  async (req, res) => {
    const { codigo } = req.params; 

    try {
        const account = await InvestmentAccountService.createInvestmentAccount(codigo);
        res.status(201).json(account);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar conta de investimento.", error: error.message });
    }
});


router.get('/balance/:codigo', validaAcesso, async (req, res) => {
    const { codigo } = req.params;

    try {
        const balance = await InvestmentAccountService.getBalance(codigo);
        res.status(200).json({ balance });
    } catch (error) {
        res.status(500).json({ message: "Erro ao visualizar saldo.", error: error.message });
    }
});

// Visualizar histórico de transações
router.get('/transactions/:codigo', validaAcesso, async (req, res) => {
    const { codigo } = req.params;
    const adminUser = await UserService.getById(req.user.codigo)

    try {
        if(adminUser.isAdmin == true) {
            const transactions = await InvestmentAccountService.getTransactionHistory(codigo);
            res.status(200).json(transactions);
        }else {
           if (adminUser.codigo == req.params.codigo) {
                const transactions = await InvestmentAccountService.getTransactionHistory(codigo);
                res.status(200).json(transactions);
           }else {
            res.status(404).json({ message: "Voce nâo pode ver as transaçôes desse usuário"});
           }
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao visualizar histórico de transações.", error: error.message });
    }
});

module.exports = router;