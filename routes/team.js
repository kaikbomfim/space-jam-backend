const { Router } = require("express");
const teamController = require("../controllers/team");
const router = Router();

router.get("/", teamController.getTeams);
router.get("/:id", teamController.getTeam);

router.post("/", teamController.postTeam);

router.patch("/:id", teamController.patchTeam);

router.delete("/:id", teamController.deleteTeam);

module.exports = router;
