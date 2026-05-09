const { Router } = require("express");
const gameController = require("../controllers/game");

const router = Router();

router.get("/", gameController.getGames);
router.get("/:id", gameController.getGame);

router.post("/", gameController.postGame);

router.patch("/:id", gameController.patchGame);

router.delete("/:id", gameController.deleteGame);

module.exports = router;