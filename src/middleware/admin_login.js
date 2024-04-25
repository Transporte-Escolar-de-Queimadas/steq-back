const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    /**
     *Realiza a validação do token passado no header da requisição
     *Deixa seguir o fluxo da rota caso o token seja válido
     *E retorna falha na autenticação caso inválido 
     */
    try {
        //Pega o Token no header da requisição
        const token = req.headers.authorization.split(' ')[1]
        //Verifica se o token é valido e retorna o escopo guardado no token
        //compara com a chave privada única
        const decode = jwt.verify(token, 'MzoieumAOMAINCI09281##MN&&AAjmalmzzmkKOkiamrimub0l0l0h4h4h4xzy51')

        next()
    } catch (error) {
        return res.status(401).send({mensagem:'Falha na autenticação', error})
    }
}