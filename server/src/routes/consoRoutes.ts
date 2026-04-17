import { Router } from "express";
import { connectLinky, getConso } from "../controllers/consoController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/linky/connect", authMiddleware, connectLinky);
router.get("/consommations", authMiddleware, getConso);

export default router;
