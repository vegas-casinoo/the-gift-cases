import express from "express";
import { env } from "./env.js";
import { meRoutes } from "./routes/me.routes.js";
import { casesRoutes } from "./routes/cases.routes.js";
import { walletRoutes } from "./routes/wallet.routes.js";
import { historyRoutes } from "./routes/history.routes.js";
import { promoRoutes } from "./routes/promo.routes.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://the-gift-cases-staticsite.onrender.com");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api", meRoutes);
app.use("/api", casesRoutes);
app.use("/api", walletRoutes);
app.use("/api", historyRoutes);
app.use("/api", promoRoutes);

app.use(errorMiddleware);

app.listen(env.PORT, () => console.log("API on", env.PORT));