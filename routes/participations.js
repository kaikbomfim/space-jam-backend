const { Router } = require("express");
const participationsController = require("../controllers/participations");

const participationsRouter = Router();

participationsRouter.get("/", participationsController.getAllParticipations);
participationsRouter.get("/:id", participationsController.getOneParticipation);
participationsRouter.post("/", participationsController.createParticipation);
participationsRouter.patch(
  "/:id",
  participationsController.updateParticipation,
);
participationsRouter.delete(
  "/:id",
  participationsController.deleteParticipation,
);

module.exports = participationsRouter;
