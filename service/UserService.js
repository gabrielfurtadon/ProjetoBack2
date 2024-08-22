const {DataTypes, Op} = require("sequelize")
const UserModel = require('../model/User.js')
module.exports = {
    create: async function(nome, usuario, senha) {
        const user = await UserModel.create({
            nome: nome,
            usuario: usuario,
            senha: senha
        })
        return user
    },
    delete: async function(codigo) {
        return await UserModel.destroy({where: { codigo: codigo }})
    },
    update: async function(codigo, nome, usuario, senha) {
        return await UserModel.update({nome: nome, usuario: usuario, senha : senha}, {
            where: { codigo: codigo }
        })
    },
    getById: async function(codigo) {
        const user =  await UserModel.findByPk(codigo)
        return user
    }
}

