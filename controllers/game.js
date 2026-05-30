import * as gameService from "../services/game.js";

const gameFields = [
  "location",
  "status",
  "matches",
  "start_date",
  "total_value",
  "end_date",
  "player_limit",
];
const playerLimitFields = ["max", "min"];
const matchesFields = [
  "id",
  "team_1",
  "team_2",
  "end_date",
  "team_1_id",
  "team_2_id",
  "result",
  "start_date",
];
const teamFields = ["name", "total_score"];

async function getGames(req, res) {
  try {
    const games = await gameService.getGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getGame(req, res) {
  try {
    const id = req.params.id;
    const game = await gameService.getGameById(id);
    if (!game) {
      throw { status: 404, message: "Jogo não encontrado" };
    }
    res.json(game);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getGameByStatus(req, res) {
  try {
    const status = req.query.status;
    if (!status) {
      throw { status: 400, message: "Status é obrigatório" };
    }
    const games = await gameService.getGameByStatus(status);
    if (!games || games.length === 0) {
      throw { status: 404, message: "Nenhum jogo encontrado com este status" };
    }
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function postGame(req, res) {
  try {
    const game = req.body;
    if (!game) {
      throw { status: 400, message: "Jogo é obrigatório" };
    }
    await gameService.createGame(game);
    res.status(201).json({ message: "Jogo adicionado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function patchGame(req, res) {
  try {
    const id = req.params.id;
    const game = req.body;
    if (!game) {
      throw { status: 400, message: "Jogo é obrigatório" };
    }
    await gameService.updateGame(game, id);
    res.send("Jogo atualizado com sucesso");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteGame(req, res) {
  try {
    const id = req.params.id;
    await gameService.deleteGame(id);
    res.send("Game deletado com sucesso");
    // if (id && mongoose.Types.ObjectId.isValid(id)) {
    // } else {
    //   res.status(422).json({ message: "ID inválido" });
    // }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  getGames,
  getGame,
  getGameByStatus,
  postGame,
  patchGame,
  deleteGame,
};
