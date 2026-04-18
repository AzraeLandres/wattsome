import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/authController";

const router = Router();

router.post("/inscription", signUp);
router.post("/connexion", signIn);
router.post("/deconnexion", signOut);

export default router;
