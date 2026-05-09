const {
  getTodosFavoritos,
  getFavoritoPorId,
  insereFavorito,
  atualizaFavorito,
  deletaFavorito,
} = require("../services/favoritos");

async function getFavoritos(req, res) {
  try {
    const favoritos = await getTodosFavoritos();
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getFavorito(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      const favorito = await getFavoritoPorId(id);
      res.json(favorito);
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function postFavorito(req, res) {
  try {
    const favoritoNovo = req.body;
    if (favoritoNovo.nome) {
      await insereFavorito(favoritoNovo);
      res.status(201).json({ message: "Favorito adicionado com sucesso" });
    } else {
      res.status(422).json({ message: "O campo nome é obrigatório" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function patchFavorito(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      const favorito = req.body;
      await atualizaFavorito(favorito, id);
      res.send("Favorito atualizado com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteFavorito(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      await deletaFavorito(id);
      res.send("Favorito deletado com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getFavoritos,
  getFavorito,
  postFavorito,
  patchFavorito,
  deleteFavorito,
};
