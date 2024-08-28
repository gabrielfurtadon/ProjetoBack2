const express = require('express');
const router = express.Router();
const AssetService = require('../service/AssetService');
const { validaAcesso } = require("../helpers/Auth.js");
const isAdmin = require('../helpers/isAdmin');

// Criar um novo ativo
router.post('/create', validaAcesso, async (req, res) => {
    const { name, symbol, currentPrice } = req.body;

    try {
        const asset = await AssetService.createAsset(name, symbol, currentPrice);
        res.status(201).json(asset);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar ativo.", error: error.message });
    }
});

// Atualizar o preço de um ativo
router.put('/update/:assetId', validaAcesso, async (req, res) => {
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
router.get('/', validaAcesso, async (req, res) => {
    try {
        const assets = await AssetService.getAllAssets();
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar ativos.", error: error.message });
    }
});

router.delete('/delete/:assetId', validaAcesso, isAdmin, async (req, res) => {
    const { assetId } = req.params;

    try {
        const result = await AssetService.deleteAsset(assetId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir ativo.", error: error.message });
    }
});

module.exports = router;