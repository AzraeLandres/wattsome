import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      idUtilisateur: string;
    };

    req.userId = decoded.idUtilisateur;
    next();
  } catch {
    return res.status(401).json({ message: "Token invalide" });
  }
};

export default authMiddleware;
