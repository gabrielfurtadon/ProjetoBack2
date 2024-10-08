const express = require('express');
const router = express.Router();
const TransactionService = require('../service/TransactionService');
const { validaAcesso } = require("../helpers/Auth.js");

// Comprar um ativo
router.post('/buy', validaAcesso, async (req, res) => {
    const { codigo, assetId, quantity } = req.body;

    try {
        const transaction = await TransactionService.buyAsset(codigo, assetId, quantity);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Erro ao realizar a compra de ativo.", error: error.message });
    }
});

// Vender um ativo
router.post('/sell', validaAcesso, async (req, res) => {
    const { codigo, assetId, quantity } = req.body;

    try {
        const transaction = await TransactionService.sellAsset(codigo, assetId, quantity);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Erro ao realizar a venda de ativo.", error: error.message });
    }
});

module.exports = router;