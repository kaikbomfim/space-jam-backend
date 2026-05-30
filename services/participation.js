import participation from "../models/participation.js";

async function getParticipations() {
  const participations = await participation.find({});
  return participations;
}

async function getParticipationById(id) {
  const participationFound = await participation.findById(id);
  return participationFound;
}

async function getParticipationsByFilter(filter) {
  const participations = await participation.find(filter);
  return participations;
}

async function createParticipation(data) {
  await participation.create(data);
}

async function updateParticipation(data, id) {
  try {
    await participation.findByIdAndUpdate(id, data);
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

export default {
  getParticipations,
  getParticipationById,
  getParticipationsByFilter,
  createParticipation,
  updateParticipation,
  deleteParticipation,
};
