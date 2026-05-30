import { Router } from "express";
import * as playerController from "../controllers/player.js";
const router = Router();

router.get("/", playerController.getPlayers);
router.get("/find", playerController.getPlayerByFavoritePosition);

router.get("/:id", playerController.getPlayer);

router.post("/", playerController.postPlayer);

router.patch("/:id", playerController.patchPlayer);

router.delete("/:id", playerController.deletePlayer);

export default router;
