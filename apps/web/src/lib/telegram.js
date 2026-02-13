export function tg() {
  return window.Telegram?.WebApp;
}

export function getInitData() {
  return tg()?.initData || "";
}

export function ready() {
  tg()?.ready?.();
}