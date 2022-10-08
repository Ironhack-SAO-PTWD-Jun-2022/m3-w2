const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ironhackDK:Senha123@cluster0.f0ie73o.mongodb.net/exampleApp?retryWrites=true&w=majority");

mongoose.connection.on('connected', () => {
  console.log('Mongoose conectado por padrão');
})

mongoose.connection.on('error', (error) => {
  console.error('Mongoose teve um erro ao conectar', error)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose desconectado!')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose encerrado por terminar processo do Node.');
    process.exit(0);
  })
})