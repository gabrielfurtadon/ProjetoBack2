const express = require("express")
const router = express.Router()

const {sucess, fail} = require("../helpers/Resposta")
const UserService = require('../service/UserService')
const isAdmin = require('../helpers/isAdmin');
const User = require('../model/User.js');
const { validaAcesso } = require("../helpers/Auth.js");

router.post("/", async (req, res) => {
    const {nome, usuario, senha} = req.body

    if ('isAdmin' in req.body) {
        return res.status(400).json({ message: "Não pode conter isAdmin nessa requisição" });
    }
    console.log("nome", nome, "usuerio", usuario, "senha", senha)

    let obj = await UserService.create(nome, usuario, senha)
    if (obj)
        res.json(sucess(obj))
    else 
        res.status(500).json(fail("Falha ao salvar o novo usuário"))
})

router.post('/admin/create', validaAcesso, isAdmin, async (req, res) => {
    const { nome, usuario, senha } = req.body;

    try {
        const newUser = await User.create({ 
            nome, 
            usuario, 
            senha,
            isAdmin : true
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar administrador.", error });
    }
});

router.delete("/:id", validaAcesso, isAdmin, async (req, res) => {
    let result = await UserService.delete(req.params.id)
    if (result)
        res.json(sucess(result))
    else
        res.status(500).json(fail("Usurio não encontrado"))
})

router.put("/:id", validaAcesso, async (req, res) => {
    const {id} = req.params
    const {nome, usuario, senha} = req.body
    const adminUser = await UserService.getById(req.user.codigo)
    const userParamAdmin = await UserService.getById(Number(req.params.id))
    if(adminUser.isAdmin == false) {
        if(Number(req.params.id) == req.user.codigo) {
            let [result] = await UserService.update(id, nome, usuario, senha)
            res.json(sucess(result))
        }else {
            res.status(400).json(fail("Voce não tem permissão para alterar outro usuario"))
        }
    }else if (adminUser.isAdmin == true){
        if(userParamAdmin.isAdmin == false) {
            let [result] = await UserService.update(id, nome, usuario, senha)
            res.json(sucess(result))
        }else if(Number(res.params.id) == req.user.codigo){
                let [result] = await UserService.update(id, nome, usuario, senha)
                res.json(sucess(result))
        }else {
            res.status(400).json(fail("Voce pode atualizar outros usuários administradores"))
        }
            
        } else {
        res.status(500).json(fail("Falha ao atualizar o usuario"))
    }
})

module.exports = router