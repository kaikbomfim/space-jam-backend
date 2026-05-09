const teamService = require("../services/team");

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
    if (id && Number(id)) {
      const team = await teamService.getTeamById(id);
      if (!team) {
        throw { status: 404, message: "Time não encontrado" };
      }
      res.json(team);
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function postTeam(req, res) {
  try {
    const team = req.body;
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
    if (id && Number(id)) {
      const team = req.body;
      await teamService.updateTeam(team, id);
      res.send("Time atualizado com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTeam(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      await teamService.deleteTeam(id);
      res.send("Time deletado com sucesso");
    } else {
      res.status(422).json({ message: "ID inválido" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getTeams, getTeam, postTeam, patchTeam, deleteTeam };
