import { Response } from "express";
import pool from "../config/database";
import { AuthRequest } from "../middleware/authMiddleware";

export const getProfil = async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT "idUtilisateur", nom, email, prm FROM utilisateur WHERE "idUtilisateur" = $1',
      [req.userId],
    );
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
