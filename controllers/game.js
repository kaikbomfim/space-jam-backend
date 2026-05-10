const gameService = require("../services/game");

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
    if (id && Number(id)) {
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

async function postGame(req, res) {
  try {
    const game = req.body;
    if (!game) {
      throw { status: 400, message: "Jogo é obrigatório" };
    }
    Object.keys(game).forEach((key) => {
      if (!gameFields.includes(key)) {
        throw { status: 400, message: `Campo ${key} não é permitido` };
      }
      gameFields.forEach((field) => {
        if (!game[field]) {
          throw { status: 400, message: `Campo ${field} é obrigatório` };
        }
      });
      if (key === "matches") {
        const matches = game[key];
        for (const match of matches) {
          Object.keys(match).forEach((matchKey) => {
            if (!matchesFields.includes(matchKey)) {
              throw {
                status: 400,
                message: `Campo ${matchKey} não é permitido em partidas`,
              };
            }
            matchesFields.forEach((field) => {
              if (!match[field]) {
                throw {
                  status: 400,
                  message: `Campo ${field} é obrigatório em partidas`,
                };
              }
            });
            if (matchKey === "team_1" || matchKey === "team_2") {
              Object.keys(match[matchKey]).forEach((teamKey) => {
                if (!teamFields.includes(teamKey)) {
                  throw {
                    status: 400,
                    message: `Campo ${teamKey} não é permitido em ${matchKey}`,
                  };
                }
                teamFields.forEach((field) => {
                  if (!match[matchKey][field]) {
                    throw {
                      status: 400,
                      message: `Campo ${field} é obrigatório em ${matchKey}`,
                    };
                  }
                });
              });
            }
          });
        }
      }
      if (key === "player_limit") {
        const playerLimit = game[key];
        Object.keys(playerLimit).forEach((playerLimitKey) => {
          if (!playerLimitFields.includes(playerLimitKey)) {
            throw {
              status: 400,
              message: `Campo ${playerLimitKey} não é permitido em limite de jogadores`,
            };
          }
        });
        playerLimitFields.forEach((field) => {
          if (!playerLimit[field]) {
            throw {
              status: 400,
              message: `Campo ${field} é obrigatório em limite de jogadores`,
            };
          }
        });
      }
    });
    await gameService.createGame(game);
    res.status(201).json({ message: "Jogo adicionado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function patchGame(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      const game = req.body;
      if (!game) {
        throw { status: 400, message: "Jogo é obrigatório" };
      }
      Object.keys(game).forEach((key) => {
        if (!gameFields.includes(key)) {
          throw { status: 400, message: `Campo ${key} não é permitido` };
        }
        if (key === "matches") {
          const matches = game[key];
          for (const match of matches) {
            Object.keys(match).forEach((matchKey) => {
              if (!matchesFields.includes(matchKey)) {
                throw {
                  status: 400,
                  message: `Campo ${matchKey} não é permitido em partidas`,
                };
              }
              if (matchKey === "team_1" || matchKey === "team_2") {
                Object.keys(match[matchKey]).forEach((teamKey) => {
                  if (!teamFields.includes(teamKey)) {
                    throw {
                      status: 400,
                      message: `Campo ${teamKey} não é permitido em ${matchKey}`,
                    };
                  }
                });
              }
            });
          }
        }
        if (key === "player_limit") {
          const playerLimit = game[key];
          Object.keys(playerLimit).forEach((playerLimitKey) => {
            if (!playerLimitFields.includes(playerLimitKey)) {
              throw {
                status: 400,
                message: `Campo ${playerLimitKey} não é permitido em limite de jogadores`,
              };
            }
          });
        }
      });
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
    if (id && Number(id)) {
      await gameService.deleteGame(id);
      res.send("Jogo deletado com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getGames,
  getGame,
  postGame,
  patchGame,
  deleteGame,
};
