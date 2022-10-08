const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    const { connections } = await mongoose.connect('mongodb+srv://ironhackDK:Senha123@cluster0.f0ie73o.mongodb.net/crudDB?retryWrites=true&w=majority')
    console.log(`Conectado ao banco de dados: ${connections[0].name}`);
  } catch (error) {
    console.error(`Erro ao conectar no banco de dados: ${error}`)
  }
}

module.exports = connectToDB;