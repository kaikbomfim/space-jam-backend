import participation from "../models/participation.js";

async function getParticipations() {
  const participations = await participation
    .find()
    .populate("game_id", "location status start_date end_date") // game não tem "name"
    .populate("player_id", "name")
    .populate("team_id", "name");
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
  const participations = await participation
    .find(filter)
    .populate("game_id", "location status start_date end_date") // game não tem "name"
    .populate("player_id", "name")
    .populate("team_id", "name");
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
  createParticipation, deleteParticipation, getParticipationById, getParticipations, getParticipationsByIds, updateParticipation
};

