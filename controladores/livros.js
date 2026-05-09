const {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  atualizaLivro,
  deletaLivro,
} = require("../servicos/livros");

async function getLivros(req, res) {
  try {
    const livros = await getTodosLivros();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getLivro(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      const livro = await getLivroPorId(id);
      res.json(livro);
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function postLivro(req, res) {
  try {
    const livroNovo = req.body;
    if (livroNovo.nome) {
      await insereLivro(livroNovo);
      res.status(201).json({ message: "Livro adicionado com sucesso" });
    } else {
      res.status(422).json({ message: "O campo nome é obrigatório" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function patchLivro(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      const livro = req.body;
      await atualizaLivro(livro, id);
      res.send("Livro atualizado com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteLivro(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      await deletaLivro(id);
      res.send("Livro deletado com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getLivros, getLivro, postLivro, patchLivro, deleteLivro };
