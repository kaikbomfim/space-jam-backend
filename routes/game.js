import { Router } from "express";
import * as gameController from "../controllers/game.js";

const router = Router();

router.get("/", gameController.getGames);
router.get("/find", gameController.getGameByStatus);

router.get("/:id", gameController.getGame);

router.post("/", gameController.postGame);

router.patch("/:id", gameController.patchGame);

router.delete("/:id", gameController.deleteGame);

export default router;
