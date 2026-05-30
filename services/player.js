import player from "../models/player.js";

async function getPlayers() {
  const players = await player.find({});
  return players;
}
async function getPlayerById(id) {
  const player = await player.findById(id);
  return player;
}

// ADICIONAR FUNÇÃO PARA BUSCA VIA OUTRO PARÂMETRO

async function createPlayer(player) {
  await player.create(player);
}

async function updatePlayer(player, id) {
  try {
    await player.findByIdAndUpdate(id, player);
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

export { getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer };
