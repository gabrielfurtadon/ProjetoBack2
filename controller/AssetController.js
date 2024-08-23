const express = require('express');
const router = express.Router();
const AssetService = require('../service/AssetService');

// Criar um novo ativo
router.post('/create', async (req, res) => {
    const { name, symbol, currentPrice } = req.body;

    try {
        const asset = await AssetService.createAsset(name, symbol, currentPrice);
        res.status(201).json(asset);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar ativo.", error: error.message });
    }
});

// Atualizar o preço de um ativo
router.put('/update/:assetId', async (req, res) => {
    const { assetId } = req.params;
    const { currentPrice } = req.body;

    try {
        const asset = await AssetService.updateAssetPrice(assetId, currentPrice);
        res.status(200).json(asset);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o preço do ativo.", error: error.message });
    }
});

// Listar todos os ativos
router.get('/', async (req, res) => {
    try {
        const assets = await AssetService.getAllAssets();
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar ativos.", error: error.message });
    }
});

module.exports = router;