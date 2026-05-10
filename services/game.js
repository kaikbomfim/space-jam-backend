const fs = require("fs");
const gamesFilePath = "games.json";

async function readGames() {
  const games = await fs.promises.readFile(gamesFilePath);
  return JSON.parse(games);
}

async function getGames() {
  const games = await readGames();
  return games;
}

async function getGameById(id) {
  const games = await getGames();
  const gameFiltered = games.filter((game) => game.id == id)[0];
  return gameFiltered;
}

async function createGame(newGame) {
  const games = await getGames();
  const gamesLength = games.length;
  const newGameId = gamesLength + 1;
  games.push({
    id: newGameId,
    ...newGame,
  });
  await fs.promises.writeFile(gamesFilePath, JSON.stringify(games));
}

async function updateGame(game, id) {
  let games = await getGames();
  const index = games.findIndex((game) => game.id == id);
  if (index === -1) {
    throw { status: 404, message: "Jogo não encontrado" };
  }
  games[index] = game;
  await fs.promises.writeFile(gamesFilePath, JSON.stringify(games));
}

async function deleteGame(id) {
  let games = await getGames();
  const gamesFiltered = games.filter((game) => game.id != id);
  if (games.length === gamesFiltered.length) {
    throw { status: 404, message: "Jogo não encontrado" };
  }
  await fs.promises.writeFile(gamesFilePath, JSON.stringify(gamesFiltered));
}

module.exports = {
  readGames,
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};
