import * as gameService from "../services/game.js";
import mongoose from 'mongoose';

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
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      const game = await gameService.getGameById(id);
      if (!game) {
        throw { status: 404, message: "Jogo não encontrado" };
      }
      res.json(game);
    } else {
      res.status(422).json({ message: "ID inválido" });
    }    
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
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      const game = req.body;
      if (!game) {
        throw { status: 400, message: "Jogo é obrigatório" };
      }
      await gameService.updateGame(game, id);
      res.send("Jogo atualizado com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteGame(req, res) {
  try {
    const id = req.params.id;
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      await gameService.deleteGame(id);
      res.send("Game deletado com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
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
