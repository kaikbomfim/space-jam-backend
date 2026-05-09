const fs = require("fs");
const participationsFilePath = "participations.json";

async function readParticipations() {
  const participations = await fs.promises.readFile(participationsFilePath);
  return JSON.parse(participations);
}

async function getParticipations() {
  const participations = await readParticipations();
  return participations;
}

async function getParticipationById(id) {
  const participations = await getParticipations();
  const participationFiltered = participations.filter((p) => p.id == id)[0];
  return participationFiltered;
}

async function createParticipation(participation) {
  const participations = await getParticipations();
  participations.push(participation);
  await fs.promises.writeFile(
    participationsFilePath,
    JSON.stringify(participations),
  );
}

async function updateParticipation(participation, id) {
  let participations = await getParticipations();
  const index = participations.findIndex(
    (participation) => participation.id == id,
  );
  participations[index] = participation;
  await fs.promises.writeFile(
    participationsFilePath,
    JSON.stringify(participations),
  );
}

async function deleteParticipation(id) {
  let participations = await getParticipations();
  const participationsFiltered = participations.filter(
    (participation) => participation.id != id,
  );
  await fs.promises.writeFile(
    participationsFilePath,
    JSON.stringify(participationsFiltered),
  );
}

module.exports = {
  readParticipations,
  getParticipations,
  getParticipationById,
  createParticipation,
  updateParticipation,
  deleteParticipation,
};
