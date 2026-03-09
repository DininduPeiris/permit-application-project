import express from "express";
import { permitController } from "../controllers/permit-controller";

const router = express.Router();

router.post("/permit", permitController.createPermitApplication);
router.get("/permit", permitController.getAllPermits);
// router.get("/permit/:id", permitController.getPermitById);
router.get("/permit/:id", permitController.getPermitByCitizenId);
router.patch("/permit/:id/status", permitController.updatePermitStatus);

export default router;