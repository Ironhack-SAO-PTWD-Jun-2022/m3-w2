// pacotes
const express = require('express');

// config
require('dotenv').config();
const app = express();

// middleware
app.use(express.json());

const myMiddleware = (req, res, next) => {
  console.log('passei pelo middleware!')
  req.goiaba = 'Fruta mto boa!'
  next();
}

const myMiddleware2 = (req, res, next) => {
  console.log('passei pelo middleware 2!')
  next();
}

// app.use(myMiddleware2);
app.use(myMiddleware);

// console.log(process.env.CLIENT_ID)


// rotas
app.get('/', (req, res) => {
  console.log(req)
  res.send('Home')
})

app.get('/users/:username', (req, res) => {
  res.json({...req.params})
})

app.get('/books/list', (req, res) => {
  res.json(['livro 1', 'livro 2'])
})

app.get('/books/:bookId', (req, res) => {
  res.json({ id: req.params.bookId })
})

app.get('/search', (req, res) => {
  if(!req.query.city) {
    return res.status(400).json('Faltam informações');
  }
  res.json({ endpoint: '/search', queries: req.query });
})

app.get('/login', (req, res) => {
  res.json('servidor vai mandar o arquivo de HTML com o form')
} )

app.post('/login', (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;
  if(!username || !password) {
    return res.status(400).json('Faltam nome de usuário ou senha!')
  }
  res.json('servidor vai receber informações de login')
} )

app.get('/users/:username/books/:bookId', (req, res) => {
  const { username, bookId } = req.params;
  res.json({ message: `O ${username} tem o livro ${bookId}` })
})

app.get('/test-middleware', (req, res) => {
  console.log(req.goiaba)
  console.log('chegamos na rota!')
  res.status(200).json('chegamos na rota!')
})

app.get('/test-middleware-2', myMiddleware2, (req, res) => {
  console.log('chegamos na rota 2!')
  res.status(200).json('chegamos na rota 2!')
})



// porta para o servidor
// const PORT = 5000
const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Servidor rodando na porta:', PORT))