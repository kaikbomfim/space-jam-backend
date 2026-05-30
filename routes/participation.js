import { Router } from "express";
import * as participationController from "../controllers/participation.js";
const router = Router();

router.get("/", participationController.getParticipations);
router.get("/find", participationController.getParticipationsByIds);

router.get("/:id", participationController.getParticipation);

router.post("/", participationController.postParticipation);

router.patch("/:id", participationController.patchParticipation);

router.delete("/:id", participationController.deleteParticipation);

export default router;
