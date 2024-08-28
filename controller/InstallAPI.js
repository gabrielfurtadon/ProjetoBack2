// controller/InstallController.js

const express = require('express');
const router = express.Router();
const sequelize = require('../helpers/bd');
const UserService = require('../service/UserService');
const AssetService = require('../service/AssetService');
const InvestmentAccountService = require('../service/InvestmentAccountService');
const TransactionService = require('../service/TransactionService');
const User = require('../model/User')

router.post('/install', async (req, res) => {
    try {
        // Sincroniza o banco de dados, recriando todas as tabelas
        await sequelize.sync({ force: true });

        // Criação de usuários
        const usuarios = [
            { nome: "Gabriel", usuario: "gabriel", senha: "123", email: "gabriel@example.com", isAdmin: false },
            { nome: "Laura", usuario: "laura", senha: "123", email: "laura@example.com", isAdmin: false },
            { nome: "Roberto", usuario: "roberto", senha: "123", email: "roberto@example.com", isAdmin: false },
            { nome: "Ana Paula", usuario: "ana", senha: "123", email: "ana@example.com", isAdmin: false },
            { nome: "admin", usuario: "admin", senha: "admin", email: "admin@example.com", isAdmin: true }
        ];

        const createdUsers = [];
        for (let i = 0; i < usuarios.length; i++) {
            createdUsers.push(await UserService.create(
                usuarios[i].nome,
                usuarios[i].usuario,
                usuarios[i].senha,
                usuarios[i].email,
                usuarios[i].isAdmin
            ));
        }

        // Criação de ativos (assets)
        const assets = [
            { name: "ITAU", symbol: "ITUB4", currentPrice: 100.00 },
            { name: "NU BANK", symbol: "ROXO34", currentPrice: 50.00 },
            { name: "PETROBRAS", symbol: "PETR4", currentPrice: 75.00 },
            { name: "APPLE", symbol: "AAPL34", currentPrice: 120.00 },
            { name: "BRADESCO", symbol: "BBDC4", currentPrice: 90.00 }
        ];

        const createdAssets = [];
        for (let i = 0; i < assets.length; i++) {
            createdAssets.push(await AssetService.createAsset(
                assets[i].name,
                assets[i].symbol,
                assets[i].currentPrice
            ));
        }

        // Criação de contas de investimento para cada usuário
        const createdAccounts = [];
        for (let i = 0; i < createdUsers.length; i++) {
            createdAccounts.push(await InvestmentAccountService.createInvestmentAccount(createdUsers[i].codigo));
        }

        // Criação de transações (compras de ativos)
        const transactions = [
            { codigo: createdUsers[0].codigo, assetId: createdAssets[0].assetId, quantity: 3 },
            { codigo: createdUsers[1].codigo, assetId: createdAssets[1].assetId, quantity: 3 },
            { codigo: createdUsers[2].codigo, assetId: createdAssets[2].assetId, quantity: 3 },
            { codigo: createdUsers[3].codigo, assetId: createdAssets[3].assetId, quantity: 3 },
            { codigo: createdUsers[4].codigo, assetId: createdAssets[4].assetId, quantity: 3 }
        ];

        const createdTransactions = [];
        for (let i = 0; i < transactions.length; i++) {
            createdTransactions.push(await TransactionService.buyAsset(
                transactions[i].codigo,
                transactions[i].assetId,
                transactions[i].quantity
            ));
        }

        await User.create({
            nome: 'Admin',
            usuario: 'admin',
            senha: 'admin',  // Importante: Use um hash de senha em produção
            isAdmin: true
        });

        res.json({
            status: true,
            users: createdUsers,
            assets: createdAssets,
            accounts: createdAccounts,
            transactions: createdTransactions
        });
    } catch (error) {
        res.status(500).json({ status: false, message: "Erro durante a instalação", error: error.message });
    }
});

module.exports = router;
