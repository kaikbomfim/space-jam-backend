import teamService from "../services/team.js";
import mongoose from "mongoose";

async function getTeams(req, res) {
  try {
    const teams = await teamService.getTeams();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTeam(req, res) {
  try {
    const id = req.params.id;
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      const team = await teamService.getTeamById(id);
      if (!team) {
        throw { status: 404, message: "Time não encontrado" };
      }
      res.json(team);
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ADICIONAR FUNÇÃO PARA BUSCA VIA OUTRO PARÂMETRO

async function postTeam(req, res) {
  try {
    const team = req.body;
    if (!team) {
      throw { status: 400, message: "Time é obrigatório" };
    }
    if (team.name) {
      await teamService.createTeam(team);
      res.status(201).json({ message: "Time adicionado com sucesso" });
    } else {
      res.status(422).json({ message: "O campo nome é obrigatório" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function patchTeam(req, res) {
  try {
    const id = req.params.id;
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      const team = req.body;
      if (!team) {
        throw { status: 400, message: "Time é obrigatório" };
      }
      if (team.name) {
        await teamService.updateTeam(team, id);
        res.send("Time atualizado com sucesso");
      } else {
        res.status(422).json({ message: "O campo nome é obrigatório" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTeam(req, res) {
  try {
    const id = req.params.id;
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      await teamService.deleteTeam(id);
      res.send("Time deletado com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getTeams, getTeam, postTeam, patchTeam, deleteTeam };
