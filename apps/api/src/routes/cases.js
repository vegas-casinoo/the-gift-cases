import { Router } from "express";
import { authTma } from "../middlewares/authTma.js";
import { supabase } from "../services/supabase.js";
import { pickWeighted } from "../services/rng.js";

export const casesRoutes = Router();

casesRoutes.get("/cases", authTma, async (req, res) => {
  const tab = String(req.query.tab || "all"); // all | popular | new
  let q = supabase.from("cases").select("*").eq("is_active", true);

  if (tab === "popular") q = q.order("popularity", { ascending: false });
  else if (tab === "new") q = q.order("created_at", { ascending: false });
  else q = q.order("sort", { ascending: true });

  const { data, error } = await q;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ cases: data });
});

casesRoutes.post("/cases/:id/open", authTma, async (req, res) => {
  const caseId = req.params.id;
  const userId = req.user.id;

  const { data: theCase, error: cErr } = await supabase
    .from("cases")
    .select("*")
    .eq("id", caseId)
    .single();
  if (cErr) return res.status(404).json({ error: "Case not found" });

  // check balance
  const { data: wallet, error: wErr } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (wErr) return res.status(500).json({ error: wErr.message });

  if (Number(wallet.balance_ton) < Number(theCase.price_ton)) {
    return res.status(400).json({ error: "Недостаточно TON" });
  }

  // load items
  const { data: items, error: iErr } = await supabase
    .from("case_items")
    .select("*")
    .eq("case_id", caseId);
  if (iErr) return res.status(500).json({ error: iErr.message });
  if (!items?.length) return res.status(400).json({ error: "Case empty" });

  const chosen = pickWeighted(items);

  // atomic-ish: write tx + opening + update wallet
  const newBalance = Number(wallet.balance_ton) - Number(theCase.price_ton);

  const { error: uErr } = await supabase
    .from("wallets")
    .update({ balance_ton: newBalance })
    .eq("user_id", userId);
  if (uErr) return res.status(500).json({ error: uErr.message });

  const { data: opening, error: oErr } = await supabase
    .from("openings")
    .insert({
      user_id: userId,
      case_id: caseId,
      item_id: chosen.id,
      spent_ton: theCase.price_ton
    })
    .select("*")
    .single();
  if (oErr) return res.status(500).json({ error: oErr.message });

  res.json({ opening, reward: chosen, balance_ton: newBalance });
});