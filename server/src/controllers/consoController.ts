import { Request, Response } from "express";
import pool from "../config/database";
import axios from "axios";
import { AuthRequest } from "../middleware/authMiddleware";
import { log } from "console";

export const connectLinky = async (req: AuthRequest, res: Response) => {
  const { token } = req.body;

  try {
    //Extrait PRM
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    );
    const prm = payload.sub?.[0];

    if (!prm) {
      return res.status(400).json({ message: "PRM non trouvé dans le token" });
    }

    //Récupère les données 90 jours
    const end = new Date().toISOString().split("T")[0];
    const start = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const response = await axios.get(
      `https://conso.boris.sh/api/daily_consumption/?prm=${prm}&start=${start}&end=${end}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "https://github.com/AzraeLandres/wattsome",
        },
      },
    );

    const readings = response.data.interval_reading;

    //stocker
    for (const reading of readings) {
      await pool.query(
        'INSERT INTO consommation (valeur, unite, "dateMesure", "idUtilisateur") VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
        [reading.value, "kWh", reading.date, req.userId],
      );
    }

    await pool.query(
      'UPDATE utilisateur SET "tokenLinky" = $1, prm = $2 WHERE "idUtilisateur" = $3',
      [token, prm, req.userId],
    );

    res.json({
      message: "Compteur Linky connecté avec succès",
      prm,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion à Linky :", error);
    res.status(500).json({
      message: "Erreur lors de la connexion à Linky",
      error: String(error),
    });
  }
};
export const getConso = async (req: AuthRequest, res: Response) => {
  const { start, end, scale } = req.query;

  try {
    const result = await pool.query(
      `SELECT valeur , "dateMesure" FROM consommation
        WHERE "idUtilisateur" = $1 
        AND "dateMesure" BETWEEN $2 AND $3
        ORDER BY "dateMesure" ASC`,
      [req.userId, start, end],
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des données de consommation",
      error,
    });
  }
};
