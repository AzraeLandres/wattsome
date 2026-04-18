import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";

import alerteRoutes from "./routes/alertesRoutes";
import authRoutes from "./routes/authRoutes";
import consoRoutes from "./routes/consoRoutes";
import userRoutes from "./routes/userRoutes";

import { syncTousLesUtilisateurs } from "./controllers/consoController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", alerteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", consoRoutes);
app.use("/api", userRoutes);

const minute = Math.floor(Math.random() * 60);
const heure = Math.floor(Math.random() * 2) + 8;

// Planifier la synchronisation tous les jours à une heure aléatoire entre 8h et 10h
cron.schedule(`${minute} ${heure} * * *`, async () => {
  await syncTousLesUtilisateurs();
});

app.get("/check", (req, res) => {
  res.json({ status: "c'est good" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
