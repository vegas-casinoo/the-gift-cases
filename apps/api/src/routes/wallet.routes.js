import { Router } from "express";
import { authTma } from "../middlewares/authTma.js";
import { supabase } from "../services/supabase.js";

export const walletRoutes = Router();

walletRoutes.get("/wallet/balance", authTma, async (req, res) => {
  const { data, error } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", req.user.id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ wallet: data });
});

// MVP: только "заявка на вывод" (без реальной отправки TON пока)
walletRoutes.post("/wallet/withdraw/request", authTma, async (req, res) => {
  const { type, amount, ton_address } = req.body || {};
  // type: "ton" | "stars" | "gift"
  // Здесь позже добавим реальные интеграции + проверки.
  res.json({ ok: true, status: "requested", type, amount, ton_address: ton_address || null });
});