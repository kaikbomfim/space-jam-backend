const { Router } = require("express");
const playerController = require("../controllers/player");
const router = Router();

router.get("/", playerController.getPlayers);
router.get("/:id", playerController.getPlayer);

router.post("/", playerController.postPlayer);

router.patch("/:id", playerController.patchPlayer);

router.delete("/:id", playerController.deletePlayer);

module.exports = router;
