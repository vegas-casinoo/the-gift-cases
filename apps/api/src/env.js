export const env = {
  PORT: process.env.PORT || 3000,
  BOT_TOKEN: process.env.BOT_TOKEN,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
};

for (const k of ["BOT_TOKEN", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"]) {
  if (!env[k]) throw new Error(`Missing env var: ${k}`);
}