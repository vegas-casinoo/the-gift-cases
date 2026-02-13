import { Router } from "express";
import { authTma } from "../middlewares/authTma.js";
import { supabase } from "../services/supabase.js";

export const historyRoutes = Router();

historyRoutes.get("/history", authTma, async (req, res) => {
  const { data, error } = await supabase
    .from("openings")
    .select("id, created_at, spent_ton, cases(name), case_items(title, rarity, image_url)")
    .eq("user_id", req.user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ history: data });
});