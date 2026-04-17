import { Router } from "express";
import { signUp, signIn } from "../controllers/authController";

const router = Router();

router.post("/inscription", signUp);
router.post("/connexion", signIn);

export default router;
