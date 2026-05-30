import participation from "../models/participation.js";

async function getParticipations() {
  const participations = await participation.find({});
  return participations;
}

async function getParticipationById(id) {
  const participationFound = await participation.findById(id);
  return participationFound;
}

async function getParticipationsByIds(ids) {
  const filter = {};
  if (ids.game_id) filter.game_id = ids.game_id;
  if (ids.team_id) filter.team_id = ids.team_id;
  if (ids.player_id) filter.player_id = ids.player_id;
  const participations = await participation.find(filter);
  return participations;
}

async function createParticipation(newParticipation) {
  await participation.create(newParticipation);
}

async function updateParticipation(updatedParticipation, id) {
  try {
    await participation.findByIdAndUpdate(id, updatedParticipation);
  } catch (error) {
    throw { status: 500, message: "Erro ao atualizar participação" };
  }
}

async function deleteParticipation(id) {
  try {
    await participation.findByIdAndDelete(id);
  } catch (error) {
    throw { status: 500, message: "Erro ao deletar participação" };
  }
}

export {
  getParticipations,
  getParticipationById,
  getParticipationsByIds,
  createParticipation,
  updateParticipation,
  deleteParticipation,
};
