const Asset = require('../model/Asset');

module.exports = {
    createAsset: async function(name, symbol, currentPrice) {
        return await Asset.create({
            name: name,
            symbol: symbol,
            currentPrice: currentPrice
        });
    },

    updateAssetPrice: async function(assetId, newPrice) {
        const asset = await Asset.findByPk(assetId);
        if (!asset) {
            throw new Error('Ativo não encontrado');
        }

        asset.currentPrice = newPrice;
        await asset.save();
        return asset;
    },

    getAllAssets: async function() {
        return await Asset.findAll();
    },

    deleteAsset: async function(assetId) {
    
        const asset = await Asset.findByPk(assetId);

        if (!asset) {
            throw new Error('Ativo não encontrado');
        }

        await asset.destroy();

        return { message: 'Ativo excluído com sucesso' };
    }


};