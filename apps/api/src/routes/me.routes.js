import { Router } from "express";
import { authTma } from "../middlewares/authTma.js";

export const meRoutes = Router();
meRoutes.get("/me", authTma, async (req, res) => {
  res.json({ user: req.user });
});