const express = require("express")
const router = express.Router()

const {sucess, fail} = require("../helpers/Resposta")
const UserService = require('../service/UserService')

router.post("/", async (req, res) => {
    const {nome, usuario, senha} = req.body
    console.log("nome", nome, "usuerio", usuario, "senha", senha)

    //TODO validar os campos
    let obj = await UserService.create(nome, usuario, senha)
    if (obj)
        res.json(sucess(obj))
    else 
        res.status(500).json(fail("Falha ao salvar o novo usuário"))
})

module.exports = router