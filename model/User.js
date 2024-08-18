const {DataTypes, Op} = require("sequelize")
const sequelize = require("../helpers/bd")

const UserModel = sequelize.define('Users', 
    {
        codigo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: DataTypes.STRING,
        usuario: DataTypes.STRING,
        senha: DataTypes.STRING
    }
)

module.exports = UserModel