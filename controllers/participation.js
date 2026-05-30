import participationService from "../services/participation.js";
import mongoose from "mongoose";

async function getParticipations(req, res) {
  try {
    const participations = await participationService.getParticipations();
    res.json(participations);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

async function getParticipation(req, res) {
  try {
    const id = req.params.id;
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      const participation = await participationService.getParticipationById(id);
      if (!participation) {
        throw { status: 404, message: "Participação não encontrada" };
      }
      res.json(participation);
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

async function searchParticipations(req, res) {
  try {
    const allowed = ["game_id", "team_id", "player_id"];
    const filter = {};
    for (const field of allowed) {
      const value = req.query[field];
      if (value !== undefined) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return res.status(422).json({ message: `${field} inválido` });
        }
        filter[field] = value;
      }
    }
    if (Object.keys(filter).length === 0) {
      return res.status(422).json({
        message:
          "Informe ao menos um filtro: game_id, team_id ou player_id",
      });
    }
    const participations =
      await participationService.getParticipationsByFilter(filter);
    res.json(participations);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

async function postParticipation(req, res) {
  try {
    const participation = req.body;
    if (!participation) {
      throw { status: 400, message: "Participação é obrigatória" };
    }
    if (
      mongoose.Types.ObjectId.isValid(participation.game_id) &&
      mongoose.Types.ObjectId.isValid(participation.team_id) &&
      mongoose.Types.ObjectId.isValid(participation.player_id)
    ) {
      await participationService.createParticipation(participation);
      res.status(201).json({ message: "Participação adicionada com sucesso" });
    } else {
      res.status(422).json({
        message:
          "Os campos game_id, team_id e player_id são obrigatórios e devem ser ObjectIds válidos",
      });
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

async function patchParticipation(req, res) {
  try {
    const id = req.params.id;
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      const participation = req.body;
      if (!participation) {
        throw { status: 400, message: "Participação é obrigatória" };
      }
      await participationService.updateParticipation(participation, id);
      res.send("Participação atualizada com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

async function deleteParticipation(req, res) {
  try {
    const id = req.params.id;
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      await participationService.deleteParticipation(id);
      res.send("Participação deletada com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

export default {
  getParticipations,
  getParticipation,
  searchParticipations,
  postParticipation,
  patchParticipation,
  deleteParticipation,
};
