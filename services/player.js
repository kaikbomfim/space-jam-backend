import player from "../models/player.js";

async function getPlayers() {
  const players = await player.find({});
  return players;
}
async function getPlayerById(id) {
  const players = await player.findById(id);
  return players;
}

async function getPlayerByFavoritePosition(favoritePosition) {
  const players = await player.find({ favorite_position: favoritePosition });
  return players;
}

async function createPlayer(newPlayer) {
  await player.create(newPlayer);
}

async function updatePlayer(updatedPlayer, id) {
  try {
    await player.findByIdAndUpdate(id, updatedPlayer);
  } catch (error) {
    throw { status: 500, message: "Erro ao atualizar jogador" };
  }
}

async function deletePlayer(id) {
  try {
    await player.findByIdAndDelete(id);
  } catch (error) {
    throw { status: 500, message: "Erro ao deletar jogador" };
  }
}

export {
  getPlayers,
  getPlayerById,
  getPlayerByFavoritePosition,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
