const {DataTypes, Op} = require("sequelize")
const UserModel = require('../model/User.js')
module.exports = {
    listUsers: async (limit, page) => {
        const offset = (page - 1) * limit; // Calcula o offset com base na página e no limite
    
        // Validação dos parâmetros de limite
        const validLimits = [5, 10, 30];
        if (!validLimits.includes(limit)) {
            throw new Error('O limite deve ser 5, 10 ou 30');
        }
    
        // Busca os projetos com paginação
        return UserModel.findAndCountAll({
            limit: limit,
            offset: offset,
        });
    },
    create: async function(nome, usuario, senha, email) {
        const user = await UserModel.create({
            nome: nome,
            usuario: usuario,
            senha: senha,
            email: email
        })
        return user
    },
    delete: async function(codigo) {
        return await UserModel.destroy({where: { codigo: codigo }})
    },
    update: async function(codigo, nome, usuario, senha, email) {
        return await UserModel.update({nome: nome, usuario: usuario, senha : senha, email: email}, {
            where: { codigo: codigo }
        })
    },
    getById: async function(codigo) {
        const user =  await UserModel.findByPk(codigo)
        return user
    }
}

