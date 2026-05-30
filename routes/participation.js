import { Router } from "express";
import participationController from "../controllers/participation.js";
const router = Router();

router.get("/", participationController.getParticipations);
// Busca personalizada por funil (game_id/team_id/player_id) via query string.
// Precisa vir ANTES de "/:id" para "search" não ser tratado como um id.
router.get("/search", participationController.searchParticipations);
router.get("/:id", participationController.getParticipation);

router.post("/", participationController.postParticipation);

router.patch("/:id", participationController.patchParticipation);

router.delete("/:id", participationController.deleteParticipation);

export default router;
