import participation from "../models/participation.js";

async function getParticipations() {
  const participations = await participation.find({});
  return participations;
}

async function getParticipationById(id) {
  const participations = await participation.findById(id);
  return participations;
}

async function getParticipationsByIds(ids) {
  const filter = {};
  if (ids.gameId) filter.game_id = ids.gameId;
  if (ids.teamId) filter.team_id = ids.teamId;
  if (ids.playerId) filter.player_id = ids.playerId;
  const participations = await participation.find(filter);
  return participations;
}

async function createParticipation(newParticipation) {
  await participation.create(newParticipation);
}

async function updateParticipation(updatedParticipation, id) {
  await participation.findByIdAndUpdate(id, updatedParticipation);
}

async function deleteParticipation(id) {
  await participation.findByIdAndDelete(id);
}

export {
  getParticipations,
  getParticipationById,
  getParticipationsByIds,
  createParticipation,
  updateParticipation,
  deleteParticipation,
};
