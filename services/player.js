const fs = require("fs");
const playersFilePath = "players.json";

async function readPlayers() {
  const players = await fs.promises.readFile(playersFilePath);
  return JSON.parse(players);
}

async function getPlayers() {
  const players = await readPlayers();
  return players;
}

async function getPlayerById(id) {
  const players = await getPlayers();
  const playerFiltered = players.filter((player) => player.id == id)[0];
  return playerFiltered;
}

async function createPlayer(player) {
  const players = await getPlayers();
  players.push(player);
  await fs.promises.writeFile(playersFilePath, JSON.stringify(players));
}

async function updatePlayer(player, id) {
  let players = await getPlayers();
  const index = players.findIndex((player) => player.id == id);
  players[index] = player;
  await fs.promises.writeFile(playersFilePath, JSON.stringify(players));
}

async function deletePlayer(id) {
  let players = await getPlayers();
  const playersFiltered = players.filter((player) => player.id != id);
  await fs.promises.writeFile(playersFilePath, JSON.stringify(playersFiltered));
}

module.exports = {
  readPlayers,
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
