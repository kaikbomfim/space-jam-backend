import { Router } from "express";
import teamController from "../controllers/team.js";
const router = Router();

router.get("/", teamController.getTeams);
router.get("/:id", teamController.getTeam);

router.post("/", teamController.postTeam);

router.patch("/:id", teamController.patchTeam);

router.delete("/:id", teamController.deleteTeam);

export default router;
