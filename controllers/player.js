const playerService = require("../services/player");

async function getPlayers(req, res) {
  try {
    const players = await playerService.getPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getPlayer(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      const player = await playerService.getPlayerById(id);
      if (!player) {
        throw { status: 404, message: "Jogador não encontrado" };
      }
      res.json(player);
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function postPlayer(req, res) {
  try {
    const player = req.body;
    if (player.name && player.email) {
      await playerService.createPlayer(player);
      res.status(201).json({ message: "Jogador adicionado com sucesso" });
    } else {
      res
        .status(422)
        .json({ message: "Os campos nome e email são obrigatórios" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function patchPlayer(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      const player = req.body;
      await playerService.updatePlayer(player, id);
      res.send("Jogador atualizado com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deletePlayer(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      await playerService.deletePlayer(id);
      res.send("Jogador deletado com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getPlayers,
  getPlayer,
  postPlayer,
  patchPlayer,
  deletePlayer,
};
