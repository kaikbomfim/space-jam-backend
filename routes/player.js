import { Router } from "express";
import playerController from "../controllers/player.js";
const router = Router();

router.get("/", playerController.getPlayers);
router.get("/:id", playerController.getPlayer);

router.post("/", playerController.postPlayer);

router.patch("/:id", playerController.patchPlayer);

router.delete("/:id", playerController.deletePlayer);

export default router;
