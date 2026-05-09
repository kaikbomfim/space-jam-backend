const participationService = require("../services/participation");

async function getParticipations(req, res) {
  try {
    const participations = await participationService.getParticipations();
    res.json(participations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getParticipation(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      const participation = await participationService.getParticipationById(id);
      res.json(participation);
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function postParticipation(req, res) {
  try {
    const participation = req.body;
    if (
      participation.game_id &&
      Number(participation.game_id) &&
      participation.team_id &&
      Number(participation.team_id) &&
      participation.player_id &&
      Number(participation.player_id)
    ) {
      await participationService.createParticipation(participation);
      res.status(201).json({ message: "Participação adicionada com sucesso" });
    } else {
      res.status(422).json({
        message:
          "Os campos game_id, team_id e player_id são obrigatórios e devem ser numéricos",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function patchParticipation(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      const participation = req.body;
      if (
        participation.game_id &&
        Number(participation.game_id) &&
        participation.team_id &&
        Number(participation.team_id) &&
        participation.player_id &&
        Number(participation.player_id)
      ) {
        await participationService.updateParticipation(participation, id);
        res.send("Participação atualizada com sucesso");
      } else {
        res.status(422).json({
          message:
            "Os campos game_id, team_id e player_id são obrigatórios e devem ser numéricos",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteParticipation(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      await participationService.deleteParticipation(id);
      res.send("Participação deletada com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getParticipations,
  getParticipation,
  postParticipation,
  patchParticipation,
  deleteParticipation,
};
