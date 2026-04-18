import { Router } from "express";
import { getProfil } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/profil", authMiddleware, getProfil);

export default router;
