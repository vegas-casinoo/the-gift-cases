import crypto from "crypto";

function parse(initData) {
  const p = new URLSearchParams(initData);
  const obj = {};
  for (const [k, v] of p.entries()) obj[k] = v;
  return obj;
}

function dataCheckString(obj) {
  return Object.keys(obj)
    .filter((k) => k !== "hash")
    .sort()
    .map((k) => `${k}=${obj[k]}`)
    .join("\n");
}

export function verifyInitData(initData, botToken, maxAgeSec = 24 * 60 * 60) {
  if (!initData) throw new Error("Missing initData");
  const obj = parse(initData);

  const hash = obj.hash;
  if (!hash) throw new Error("Missing hash");

  const authDate = Number(obj.auth_date || 0);
  if (!authDate) throw new Error("Missing auth_date");
  const now = Math.floor(Date.now() / 1000);
  if (now - authDate > maxAgeSec) throw new Error("initData expired");

  const secretKey = crypto.createHmac("sha256", "WebAppData").update(botToken).digest();
  const check = crypto.createHmac("sha256", secretKey).update(dataCheckString(obj)).digest("hex");
  if (check !== hash) throw new Error("Invalid initData hash");

  const user = obj.user ? JSON.parse(obj.user) : null;
  if (!user?.id) throw new Error("Missing user");
  return user;
}