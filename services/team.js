import team from "../models/team.js";

async function getTeams() {
  const teams = await team.find({});
  return teams;
}

async function getTeamById(id) {
  const teams = await team.findById(id);
  return teams;
}

async function getTeamByName(name) {
  const teams = await team.find({ name: name });
  return teams;
}

async function createTeam(newTeam) {
  await team.create(newTeam);
}

async function updateTeam(updatedTeam, id) {
  try {
    await team.findByIdAndUpdate(id, updatedTeam);
  } catch (error) {
    throw { status: 500, message: "Erro ao atualizar time" };
  }
}

async function deleteTeam(id) {
  try {
    await team.findByIdAndDelete(id);
  } catch (error) {
    throw { status: 500, message: "Erro ao deletar time" };
  }
}

export {
  getTeams,
  getTeamById,
  getTeamByName,
  createTeam,
  updateTeam,
  deleteTeam,
};
