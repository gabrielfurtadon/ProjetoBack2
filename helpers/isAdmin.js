const User = require('../model/User');
const Service = require('../service/UserService')

module.exports = async (req, res, next) => {
    const usuario = req.user;
    console.log("Usuario:", usuario)

    if (!usuario || !usuario.codigo) {
      return res.status(403).json({ mensagem: 'Usuário não autenticado' });
    }

    try {
      // Encontre o usuário no banco de dados usando o ID fornecido
      const user = await User.findByPk(usuario.codigo);

      if (user && user.isAdmin) {
        next(); // Usuário é administrador, permitir a ação
      } else {
        res.status(403).json({ mensagem: 'Acesso negado. Privilégios de administrador necessários.' });
      }
    } catch (error) {
      console.error('Erro ao verificar permissões:', error.message);
      res.status(500).json({ mensagem: 'Erro ao verificar permissões do usuário.', error: error.message });
    }
};
