const fs = require("fs");

const PARTICIPATION_JSON_FILE_PATH = "participations.json";

async function getAllParticipations() {
  const participations = await fs.promises.readFile(
    PARTICIPATION_JSON_FILE_PATH,
  );
  return JSON.parse(participations);
}

async function getOneParticipation(id) {
  const participations = await getAllParticipations();
  return participations.find((p) => p.id == id);
}

async function createParticipation(participation) {
  const participations = await getAllParticipations();
  // const currentId = participation.length + 1;
  // participations.push({ id, ...participation });
  participations.push(participation);
  return fs.promises.writeFile(
    PARTICIPATION_JSON_FILE_PATH,
    JSON.stringify(participations),
  );
}

async function updateParticipation(id, participation) {
  const participations = await getAllParticipations();
  const foundIndex = participations.findIndex((p) => p.id == id);
  const foundParticipation = participations[foundIndex];
  const updatedParticipation = { ...foundParticipation, ...participation };
  participations[foundIndex] = updatedParticipation;
  return fs.promises.writeFile(
    PARTICIPATION_JSON_FILE_PATH,
    JSON.stringify(participations),
  );
}

async function deleteParticipation(id) {
  const participations = await getAllParticipations();
  const foundIndex = participations.findIndex((p) => p.id == id);
  const [deletedParticipation] = participations.splice(foundIndex, 1);
  await fs.promises.writeFile(PARTICIPATION_JSON_FILE_PATH, participations);
  return deletedParticipation;
}

module.exports = {
  createParticipation,
  deleteParticipation,
  getAllParticipations,
  getOneParticipation,
  updateParticipation,
};
