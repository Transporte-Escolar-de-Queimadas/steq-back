const connection = require("../database/connection")

module.exports = {

  async login(req, res) {   
    try {
     
      const { email, password} = req.body;

      admin = await connection("admins").select("*").where("email", email).first();
      
      if(admin.password === password){
        return res.status(201).json(admin);
      }
      else{
        return res.status(401).json({ message: 'credenciais inválidas'});
      }
    } catch (error) {
      return res.status(500).send(error)
    }
  },

  async create(req, res) {
    const { name, email, password} = req.body

    const [id] = await connection("admins").insert({
      name,
      email,
      password,
    })

    return res.json({ id })
  },

}