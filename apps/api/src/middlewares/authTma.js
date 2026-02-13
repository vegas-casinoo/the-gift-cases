import { env } from "../env.js";
import { verifyInitData } from "../services/telegramAuth.js";
import { supabase } from "../services/supabase.js";

function getInitData(req) {
  const auth = req.headers.authorization || "";
  const [kind, value] = auth.split(" ");
  if (kind?.toLowerCase() === "tma" && value) return value;
  return "";
}

export async function authTma(req, res, next) {
  try {
    const initData = getInitData(req);
    const tgUser = verifyInitData(initData, env.BOT_TOKEN);

    // upsert user
    const { data: user, error } = await supabase
      .from("users")
      .upsert(
        {
          telegram_id: tgUser.id,
          username: tgUser.username ?? null,
          first_name: tgUser.first_name ?? null,
          photo_url: tgUser.photo_url ?? null
        },
        { onConflict: "telegram_id" }
      )
      .select("*")
      .single();

    if (error) throw error;

    // ensure wallet row
    await supabase.from("wallets").upsert(
      { user_id: user.id, balance_ton: 0 },
      { onConflict: "user_id" }
    );

    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ error: e.message || String(e) });
  }
}