import team from "../models/team.js";

async function getTeams() {
  const teams = await team.find({});
  return teams;
}

async function getTeamById(id) {
  const team = await team.findById(id);
  return team;
}

// ADICIONAR FUNÇÃO PARA BUSCA VIA OUTRO PARÂMETRO

async function createTeam(team) {
  await team.create(team);
}

async function updateTeam(team, id) {
  try {
    await team.findByIdAndUpdate(id, team);
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

export { getTeams, getTeamById, createTeam, updateTeam, deleteTeam };
