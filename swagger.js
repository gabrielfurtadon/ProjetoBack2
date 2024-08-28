const swaggerAutogen = require('swagger-autogen')()


output = './swagger.json'
endpoints = ['./app.js', './controller/AssetController', './controller/InstallAPI', './controller/InvestmentAccountController', './controller/loginController', './controller/TransactionController', './controller/UserController']

swaggerAutogen(output, endpoints)