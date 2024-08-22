var express = require('express');
var path = require('path');
const Auth = require( './helpers/Auth.js')
require('dotenv').config({ path: '.env.postgres' });
const User = require('./model/User.js')
const sequelize = require('./helpers/bd'); 

var app = express();
LoginRouter = require('./controller/login.js')
UserRouter = require('./controller/UserController.js')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', LoginRouter)
app.use('/user', UserRouter)

sequelize.sync({ alter: true }).then(async () => {
    console.log('Tabelas sincronizadas.');

    // Verifica se o usuário admin já existe
    const adminExists = await User.findOne({ where: { isAdmin: true } });

    if (!adminExists) {
        await User.create({
            nome: 'Admin',
            usuario: 'admin',
            senha: 'admin',  // Importante: Use um hash de senha em produção
            isAdmin: true
        });
        console.log('Usuário admin criado.');
    }
}).catch(error => {
    console.error('Erro ao sincronizar o banco de dados:', error);
});

module.exports = app;