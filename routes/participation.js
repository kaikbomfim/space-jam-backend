const { Router } = require("express");
const participationController = require("../controllers/participation");
const router = Router();

router.get("/", participationController.getParticipations);
router.get("/:id", participationController.getParticipation);

router.post("/", participationController.postParticipation);

router.patch("/:id", participationController.patchParticipation);

router.delete("/:id", participationController.deleteParticipation);

module.exports = router;
