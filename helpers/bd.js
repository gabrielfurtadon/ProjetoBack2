const Sequelize = require("sequelize")
console.log("Dialect:", process.env.DB_DIALECT);
console.log("Dialect:", process.env.DB_NAME);
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,  
{host:  process.env.DB_HOST, port: process.env.DB_PORT, dialect: process.env.DB_DIALECT})

sequelize.authenticate()
    .then(() => console.log("Conectado no " +  process.env.DB_DIALECT + "!"))
    .catch(error => console.log(error))

module.exports = sequelize