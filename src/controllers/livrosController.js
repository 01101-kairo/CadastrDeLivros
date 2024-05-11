const express = require('express');
const cors = require('cors');

const livroModel = require('./src/modules/livro.model')

const app = express();
app.use(express.json());
app.use(cors())

// Rotas para cadastro, edição, visualização e exclusão de livros
app.post('/livros', (req, res) => {
    // Implemente o código para cadastrar um livro
});

app.put('/livros/:id', (req, res) => {
    // Implemente o código para editar um livro com base no ID
});

app.get('/livros', (req, res) => {
    // Implemente o código para listar todos os livros
});

app.get('/livros/:id', (req, res) => {
    // Implemente o código para visualizar um livro com base no ID
});

app.delete('/livros/:id', (req, res) => {
    // Implemente o código para deletar um livro com base no ID
});
