const connection = require("../database/connection")

module.exports = {

  async create(req, res) {

    try {
        const { embarkation_place, embarkation_time, destinations} = req.body
        const destinationsJSON = JSON.stringify(destinations); // Serializa o array para JSON

        const [id] = await connection("routes").insert({
          embarkation_place,
          embarkation_time,
          destinations: destinationsJSON, // Insere a versão serializada na coluna
        })
        
        return res.status(201).send('Rota criada!');
    } catch (error) {
        return res.status(400).send(error.message);
    }
  },

  async GetAll(req, res) {
    const allRoutes = await connection("routes").select("*")
    return res.json(allRoutes)
  },

  async update(req, res){
    try {
        //Pega os dados da rota
        const { id } = req.params
        const { embarkation_place, embarkation_time, destinations} = req.body
        

        const DBRoute = await connection('routes').where('id', id)
        //Verirfica se existe rota
        if (DBRoute.length < 1) {
            return res.status(409).send({ mensagem: 'Rota não existente' })
        } 
        else{
          const destinationsJSON = JSON.stringify(destinations);
          await connection('routes').where('id', id).update({
            embarkation_place,
            embarkation_time,
            destinations: destinationsJSON, // Insere a versão serializada na coluna
          })    
          return res.status(200).send({ mensagem: 'Rota atualizada com sucesso!' })
        }
    } catch (error) {
        return res.status(500).send({ error: error })
    }
  },

  async delete(req, res){
    try {
        //Pega o id da rota
        const { id } = req.params

        const DBRoute = await connection('routes').where('id', id)
        //Verirfica se existe rota
        if (DBRoute.length < 1) {
            return res.status(409).send({ mensagem: 'Rota não existente' })
        } 
        else{
          await connection('routes').where('id', id).delete();    
          return res.status(200).send({ mensagem: 'Rota deletada com sucesso!' })
        }
    } catch (error) {
        return res.status(500).send({ error: error })
    }
  },
}


