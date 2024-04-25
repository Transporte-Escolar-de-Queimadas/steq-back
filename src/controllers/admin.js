const connection = require("../database/connection")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {

  async login(req, res) {   
    try {
    
      const {username, password} = req.body;

      const DBAdmin = await connection ('admins').where('username', username);     
      
      if(DBAdmin.length < 1){
        return res.status(401).send({message: 'Falha na autenticação'});
      }
      //Faz a descriptografia da senha e realiza a autenticação
      bcrypt.compare(password, DBAdmin[0].password, (error, result) => {
        //Tratamento de erro
        if (error) {
          return res.status(401).send({ message: 'Falha na autenticação' })
        }
        //Em caso de sucesso
        if (result) {
          //Cria um escopo a ser guardado no token
          const token = jwt.sign({
            username
          }, 
          //Chave secreta para descriptografia
          'MzoieumAOMAINCI09281##MN&&AAjmalmzzmkKOkiamrimub0l0l0h4h4h4xzy51', 
          //Tempo para o token expirar
          {
            expiresIn: "1h"
          })
          return res.status(200).send(token)
        }
        return res.status(401).send({ message: 'Falha na autenticação' })
      })      
    } catch (error) {
      return res.status(500).send({error: error});
    }
  },
  async create(req, res) {
    try {
      const { username, password} = req.body;
      //O 10 é um salto, incremente 10 caracteres aleatórios na senha para garantir segurança
      bcrypt.hash(password, 10, async (errBcrypt, hash) => {
        if (errBcrypt) {
          return res.status(500).send({error: errBcrypt});
        }
        const BDAdmin = await connection('admins').where('username', username);
        
        if(BDAdmin.length > 0){
          return res.status(409).send({message: 'Admin já cadastrado'});
        }

        await connection("admins").insert({
          username,
          password: hash
        })
        return res.status(201).send ({
          message: 'Admin criado!',
          admin: {
            username,
          }
        })
      })
    } catch (error) {
      return res.status(500).send({ error: error })
    }   
  },

}