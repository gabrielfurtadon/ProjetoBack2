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
    }
}

