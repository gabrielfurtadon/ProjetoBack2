const express = require('express');
const router = express.Router();
const InvestmentAccountService = require('../service/InvestmentAccountService');
const { validaAcesso } = require("../helpers/Auth.js");

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

    try {
        const transactions = await InvestmentAccountService.getTransactionHistory(codigo);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Erro ao visualizar histórico de transações.", error: error.message });
    }
});

module.exports = router;