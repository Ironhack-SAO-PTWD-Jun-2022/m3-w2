// conexão com o banco de dados
const connectToDB = require("./config/db.config");
connectToDB().then(() => {
  // modelos
  const User = require("./models/User.model");
  const Cat = require("./models/Cat.model");

  const data = {
    username: "@GABRIEL",
    email: "GaBriEl@email.com",
    gender: 'MALE',
  };

  // const newUser = new User(data);
  // newUser.save()

  // Crud : Create
  const createUser = async (userData) => {
    try {
      const userFromDB = await User.create(userData);
      console.log(`usuário criado: ${userFromDB.username}`);
    } catch (error) {
      if (error.code === 11000) {
        console.log('email já existe!');
        return;
      }
      console.error("erro ao criar usuário!", error);
    }
  };

  // createUser(data);

  
  const createCat = async (catData) => {
    try {
      const catFromDB = await Cat.create(catData);
      console.log(`usuário criado: ${catFromDB.name}`);
    } catch (error) {
      if (error.code === 11000) {
        console.log('email já existe!');
        return;
      }
      console.error("erro ao criar gato!", error);
    }
  };

  // createCat({name: 'Xinforinfola', owner: '633f7f239feaa328112b4b4c' })

  // cRud : Read
  const findAllUsers = async () => {
    try {
      const usersFromDB = await User.find();
      console.log(`Todos os usuários:\n${usersFromDB}`)
    } catch (error) {
      console.error("erro ao buscar usuários!", error);
    }
  }
  // findAllUsers();

  const findUserByEmail = async (email) => {
    try {
      const userFromDB = await User.findOne({email}, {gender: 0}); // .findById(id)
      console.log(`usuário encontrado: ${userFromDB}`)
    } catch (error) {
      console.error("erro ao buscar usuário!", error);
    }
  }
  // findUserByEmail('GaBriEl@email.com');

  const findCatByIdWithOwner = async (id) => {
    try {
      const catFromDB = await Cat.findById(id).populate('owner');
      console.log(catFromDB);
    } catch (error) {
      console.error("erro ao buscar gato!", error);
    }
  }
  findCatByIdWithOwner('633f8010454c7ff60d7ed61d');

  // crUd : Update
  const updateCompanyAvatar = async () => {
    try {
      const resultFromDB = await User.updateMany({ email: /@email\.com/ }, { avatarUrl: 'images/email-company-avatar.png'});
      console.log(resultFromDB);
    } catch (error) {
      console.error("erro ao atualizar usuários!", error);
    }
  }
  // updateCompanyAvatar();

  const updateAvatar = async (id, newAvatarUrl) => {
    try {
      // const resultFromDB = await User.updateOne({username}, {avatarUrl: newAvatarUrl});
      const resultFromDB = await User.findByIdAndUpdate(id, {avatarUrl: newAvatarUrl}, {new: true});
      console.log(resultFromDB)
    } catch (error) {
      console.error("erro ao atualizar usuário!", error);
    }
  }
  // updateAvatar('633f77e9883a9442465ef2ac', 'images/gabriel-avatar2.png');

  // cruD : Delete
  const deleteUser = async (id) => {
    try {
      const resultFromDB = await User.findByIdAndRemove(id); // deleteOne({busca}) // deleteMany({busca})
      console.log(resultFromDB)
    } catch (error) {
      console.error("erro ao deletar usuário!", error);
    }
  }
  // deleteUser('633f77e9883a9442465ef2ac');
});
