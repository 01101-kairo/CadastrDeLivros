const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 3000

const livroModel = require('./src/models/livro.model')

const app = express()
app.use(express.json())
app.use(cors())

/*[Rota para cadastrar um livro]*/
app.post('/livros', async (req, res) => {
  try {
    const { id, titulo, paginas, ISBN, editora } = req.body;

    const livroExistente = await livroModel.findOne({ id });
    if (livroExistente) {
      return res.status(400).json({ error: 'ID já está em uso' });
    }
    const livro = await livroModel.create({
      id: req.body.id,
      titulo: req.body.titulo,
      paginas: req.body.paginas,
      ISBN: req.body.ISBN,
      editora: req.body.editora,
    });

    return res.status(201).json(livro);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao cadastrar livro' });
  }
});

/*[Rota para listar todos os livros] */
app.get('/livros', async (req, res) => {
  try {
    const livros = await livroModel.find();
    return res.status(200).json(livros);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

/*[Rota para buscar um livro pelo ID]*/
app.get('/livros/:id', async (req, res) => {
  try {
    const livro = await livroModel.findOne({ id: req.params.id });
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    return res.status(200).json(livro);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar livro' });
  }
});

/*[Rota para editar um livro pelo ID]*/
app.put('/livros/:id', async (req, res) => {
  try {
    const livro = await livroModel.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    return res.status(200).json(livro);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao editar livro' });
  }
});

/*[Rota para deletar um livro pelo ID]*/
app.delete('/livros/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const livro = await livroModel.findOneAndDelete({id});
    if (livro) {
      return res.status(200).send(`O livro com o ID ${id} foi removido com sucesso`);
    } else {
      return res.status(404).send(`O livro com o ID ${id} não foi encontrado`);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar livro' });
  }
});

/* [Inicie o servidor] */
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
