import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/database";

export const signUp = async (req: Request, res: Response) => {
  const { nom, email, mdp } = req.body;

  try {
    const knownUser = await pool.query(
      "SELECT * FROM utilisateur WHERE email= $1",
      [email],
    );
    if (knownUser.rows.length > 0) {
      return res.status(400).json({ message: "Ce compte existe déjà" });
    }

    //On hash le mot de passe
    const hashedPassword = await bcrypt.hash(mdp, 10);

    // On crée l'utilisateur
    const newUser = await pool.query(
      'INSERT INTO utilisateur (nom, email, mdp) VALUES ($1, $2, $3) RETURNING "idUtilisateur", nom, email',
      [nom, email, hashedPassword],
    );

    res.status(201).json({
      message: "Compte créé avec succès",
      user: newUser.rows[0],
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création du compte", error });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, mdp } = req.body;

  try {
    // On vérifie si l'utilisateur existe
    const user = await pool.query(
      "SELECT * FROM utilisateur WHERE email = $1",
      [email],
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Identifiants incorrects" });
    }

    // On compare les mots de passe
    const validPassword = await bcrypt.compare(mdp, user.rows[0].mdp);

    if (!validPassword) {
      return res.status(400).json({ message: "Identifiants incorrects" });
    }

    // On génère le token JWT
    const token = jwt.sign(
      { idUtilisateur: user.rows[0].idUtilisateur },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" },
    );

    res.json({
      token,
      user: {
        idUtilisateur: user.rows[0].idUtilisateur,
        nom: user.rows[0].nom,
        email: user.rows[0].email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion", error });
  }
};
