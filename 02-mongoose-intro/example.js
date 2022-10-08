// "importando" os pacotes
const mongoose = require('mongoose');

// modelos
const Cat = require('./models/Cat.model');

// conectando com o banco de dados
mongoose
  .connect("mongodb+srv://ironhackDK:Senha123@cluster0.f0ie73o.mongodb.net/exampleApp?retryWrites=true&w=majority")
  .then((result) => {
    console.log(`Conectado ao MongoDB: ${result.connections[0].name}`)
  })
  .catch((error) => {
    console.error('Erro ao conectar no Mongo.', error);
  })
  .then(() => {
    // const Cat = mongoose.model('Cat', { name: String, owner: String });
    
    // criando 1 novo gato
    // const kitty = new Cat( { name: 'Joaquim', owner: 'Renata' } );
    
    // kitty.save()
    //   .then((newCat) => {
    //     console.log(`Criado novo gato: ${newCat}`);
    //   })
    //   .catch((error) => {
    //     console.error('Erro ao criar o gato:', error);
    //   })

    // listando os gatos
    // Cat.find({name: 'José'}, {name: 1, _id: 0})
    //   .then((result) => {
    //     console.log('Lista de gatos');
    //     console.log(result);
    //     // find() sempre retorna um array
    //     for(let cat of result) {
    //       console.log(`Nome do gato: ${cat.name}`);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Erro ao recuperar lista de gatos', error);
    //   })

    // organizando o código
    const addNewCat = (catName) => {
      const newCat = new Cat({name: catName});

      newCat.save()
        .then((catFromDB) => {
          console.log(`Criado novo gato: ${newCat}`);
        })
        .catch((error) => {
          console.error('Erro ao criar o gato:', error);
        })
    };

    const showCats = () => {
      console.log('Listagem de gatos:')
      Cat.find()
        .then((catsFromDB) => {
          catsFromDB.forEach((cat) => {
            console.log(`-->> gato: ${cat.name}`);
          })
        })
        .catch((error) => {
          console.error('Erro ao recuperar lista de gatos', error);
        })
    }

    // addNewCat('Bento Primo');

    showCats();

  })

