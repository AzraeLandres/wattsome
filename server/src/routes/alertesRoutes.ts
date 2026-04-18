import { Router } from "express";
import { getAlertes, marquerLu } from "../controllers/alerteController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/alertes", authMiddleware, getAlertes);
router.patch("/alertes/:id/lu", authMiddleware, marquerLu);

export default router;
