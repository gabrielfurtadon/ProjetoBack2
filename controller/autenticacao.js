const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const sequelize = require('../helpers/bd.js');
const User = require('../model/User.js'); 

router.get("/auth", async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        const user = await User.findOne({ where: { nome: usuario } });
        
        if (!user) {
            return res.status(403).json({ logged: false, mensagem: 'Usuário não encontrado' });
        }
        const isPasswordValid = user.senha === senha; 

        if (isPasswordValid) {
            const token = jwt.sign({ usuario: usuario }, '123!@#', { expiresIn: '30 min' });
            res.json({ logged: true, token: token });
        } else {
            res.status(403).json({ logged: false, mensagem: 'Senha inválida' });
        }
    } catch (error) {
        res.status(500).json({ logged: false, mensagem: 'Erro no servidor', error: error.message });
    }
});

module.exports = router;
