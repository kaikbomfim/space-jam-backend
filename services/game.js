import game from "../models/game.js";

async function getGames() {
  const games = await game.find({});
  return games;
}

async function getGameById(id) {
  const foundGame = await game.findById(id);
  return foundGame;
}

async function getGameByStatus(status) {
  const games = await game.find({ status: status });
  return games;
}

async function createGame(newGame) {
  await game.create(newGame);
}

async function updateGame(updatedGame, id) {
  await game.findByIdAndUpdate(id, updatedGame);
}

async function deleteGame(id) {
  await game.findByIdAndDelete(id);
}

export {
  getGames,
  getGameById,
  getGameByStatus,
  createGame,
  updateGame,
  deleteGame,
};
