import pool from "../config/database";
import { AuthRequest } from "../middleware/authMiddleware";
import { Response } from "express";

export const checkAndCreateAlertes = async (userId: string) => {
  // Récupérer la moyenne des 30 derniers jours
  const moyenneResult = await pool.query(
    `SELECT AVG(valeur) as moyenne FROM consommation 
     WHERE "idUtilisateur" = $1 
     AND "dateMesure" >= NOW() - INTERVAL '30 days'`,
    [userId],
  );

  const moyenne = parseFloat(moyenneResult.rows[0].moyenne);
  if (!moyenne) return;

  // ça dépasse la moyenne de 30%
  const depassements = await pool.query(
    `SELECT * FROM consommation 
   WHERE "idUtilisateur" = $1 
   AND valeur > $2
   AND "dateMesure" >= NOW() - INTERVAL '7 days'`,
    [userId, moyenne * 1.3],
  );

  // alerte dès que ça dépasse
  for (const conso of depassements.rows) {
    // Vérifier si une alerte existe déjà
    const existing = await pool.query(
      'SELECT * FROM alerte WHERE "idConso" = $1',
      [conso.idConsommation],
    );

    if (existing.rows.length === 0) {
      await pool.query(
        `INSERT INTO alerte (message, "idUtilisateur", "idConso") 
         VALUES ($1, $2, $3)`,
        [
          `Consommation élevée détectée : ${conso.valeur} kWh (moyenne : ${moyenne.toFixed(2)} kWh)`,
          userId,
          conso.idConsommation,
        ],
      );
    }
  }
};

export const getAlertes = async (req: AuthRequest, res: Response) => {
  try {
    await checkAndCreateAlertes(req.userId!);

    const result = await pool.query(
      `SELECT * FROM alerte WHERE "idUtilisateur" = $1 ORDER BY "dateAlerte" DESC`,
      [req.userId],
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const marquerLu = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query(
      'UPDATE alerte SET lu = true WHERE "idAlerte" = $1 AND "idUtilisateur" = $2',
      [id, req.userId],
    );
    res.json({ message: "Alerte marquée comme lue" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
