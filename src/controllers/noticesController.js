const connection = require("../database/connection")

module.exports = {

  async create(req, res) {

    try {
        const { title, date, description, edited} = req.body
        
        const [id] = await connection("notices").insert({
          title,
          date,
          description,
          edited, 
        })
        
        return res.status(201).send('Aviso criado!');
    } catch (error) {
        return res.status(400).send(error.message);
    }
  },

  async GetAll(req, res) {
    const allNotices = await connection("notices").select("*")
    return res.json(allNotices)
  },

  async update(req, res){
    try {
        //Pega os dados do aviso
        const { id } = req.params
        const { title, data, description, edited} = req.body
        
        const DBNotice= await connection('notices').where('id', id)
        //Verirfica se existe aviso
        if (DBNotice.length < 1) {
            return res.status(409).send({ mensagem: 'Aviso não existente' })
        } 
        else{         
          await connection('notices').where('id', id).update({
            title,
            data,
            description,
            edited, 
          })    
          return res.status(200).send({ mensagem: 'Aviso atualizado com sucesso!' })
        }
    } catch (error) {
        return res.status(500).send({ error: error })
    }
  },

  async delete(req, res){
    try {
        //Pega o id do aviso
        const { id } = req.params

        const DBNotice = await connection('notices').where('id', id)
        //Verirfica se existe aviso
        if (DBNotice.length < 1) {
            return res.status(409).send({ mensagem: 'Aviso não existente' })
        } 
        else{
          await connection('notices').where('id', id).delete();    
          return res.status(200).send({ mensagem: 'Aviso deletado com sucesso!' })
        }
    } catch (error) {
        return res.status(500).send({ error: error })
    }
  },
}


