import { Router } from "express";
import { authTma } from "../middlewares/authTma.js";
import { supabase } from "../services/supabase.js";

export const promoRoutes = Router();

promoRoutes.post("/promo/apply", authTma, async (req, res) => {
  const code = String(req.body?.code || "").trim().toUpperCase();
  if (!code) return res.status(400).json({ error: "Введите промокод" });

  const { data: promo, error: pErr } = await supabase
    .from("promo_codes")
    .select("*")
    .eq("code", code)
    .eq("is_active", true)
    .maybeSingle();

  if (pErr) return res.status(500).json({ error: pErr.message });
  if (!promo) return res.status(404).json({ error: "Промокод не найден" });

  // check already used
  const { data: used } = await supabase
    .from("promo_uses")
    .select("id")
    .eq("promo_id", promo.id)
    .eq("user_id", req.user.id)
    .maybeSingle();

  if (used) return res.status(400).json({ error: "Вы уже использовали этот промокод" });

  // apply: add TON balance (MVP)
  const reward = Number(promo.reward_ton || 0);

  const { data: wallet, error: wErr } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", req.user.id)
    .single();
  if (wErr) return res.status(500).json({ error: wErr.message });

  const newBalance = Number(wallet.balance_ton) + reward;

  const { error: upErr } = await supabase
    .from("wallets")
    .update({ balance_ton: newBalance })
    .eq("user_id", req.user.id);
  if (upErr) return res.status(500).json({ error: upErr.message });

  await supabase.from("promo_uses").insert({ promo_id: promo.id, user_id: req.user.id });

  res.json({ ok: true, reward_ton: reward, balance_ton: newBalance });
});