const participationsService = require("../services/participations");

async function getAllParticipations(req, res) {
  try {
    const participations = await participationsService.getAllParticipations();
    res.json(participations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getOneParticipation(req, res) {
  try {
    const { id } = req.params;

    if (!validateId(id)) return res.status(422).json({ message: "ID inválido" });

    const participation = await participationsService.getOneParticipation(id);
    res.json(participation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createParticipation(req, res) {
  try {
    const { body } = req;

    if (!validateBody(body))
      return res.status(422).json({
        message: "Os campos game_id, team_id e player_id são obrigatórios e devem ser numéricos",
      });

    await participationsService.createParticipation(body);
    res.status(201).json({ message: "Participação adicionada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateParticipation(req, res) {
  try {
    const { id } = req.params;

    if (!validateId(id)) return res.status(422).json({ message: "ID inválido" });

    const { body } = req;

    if (!validateBody(body))
      return res.status(422).json({
        message: "Os campos game_id, team_id e player_id são obrigatórios e devem ser numéricos",
      });

    await participationsService.updateParticipation(id, req.body);
    res.send("Participação atualizada com sucesso");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteParticipation(req, res) {
  try {
    const { id } = req.params;

    if (!validateId(id)) return res.status(422).json({ message: "ID inválido" });

    await participationsService.deleteParticipation(id);
    res.send("Participação removida com sucesso");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

function validateId(id) {
  return id && Number(id);
}

function validateBody(body) {
  const { game_id, team_id, player_id } = body;
  return validateId(game_id) && validateId(team_id) && validateId(player_id);
}

module.exports = {
  createParticipation,
  deleteParticipation,
  getAllParticipations,
  getOneParticipation,
  updateParticipation,
};
