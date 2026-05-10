const fs = require("fs");
const teamsFilePath = "teams.json";

async function readTeams() {
  const teams = await fs.promises.readFile(teamsFilePath);
  return JSON.parse(teams);
}

async function getTeams() {
  const teams = await readTeams();
  return teams;
}

async function getTeamById(id) {
  const teams = await getTeams();
  const teamFiltered = teams.filter((team) => team.id == id)[0];
  return teamFiltered;
}

async function createTeam(team) {
  const teams = await getTeams();
  const teamsLength = teams.length;
  const newTeamId = teamsLength + 1;
  teams.push({
    id: newTeamId,
    ...team,
  });
  await fs.promises.writeFile(teamsFilePath, JSON.stringify(teams));
}

async function updateTeam(team, id) {
  let teams = await getTeams();
  const index = teams.findIndex((team) => team.id == id);
  if (index === -1) {
    throw { status: 404, message: "Time não encontrado" };
  }
  const updatedTeam = {
    ...teams[index],
    ...team,
  };
  teams[index] = updatedTeam;
  await fs.promises.writeFile(teamsFilePath, JSON.stringify(teams));
}

async function deleteTeam(id) {
  let teams = await getTeams();
  const teamsFiltered = teams.filter((team) => team.id != id);
  if (teams.length === teamsFiltered.length) {
    throw { status: 404, message: "Time não encontrado" };
  }
  await fs.promises.writeFile(teamsFilePath, JSON.stringify(teamsFiltered));
}

module.exports = {
  readTeams,
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
