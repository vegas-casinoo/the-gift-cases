export function tg() {
  return window.Telegram?.WebApp;
}

export function getInitData() {
  return tg()?.initData || "";
}

export function ready() {
  tg()?.ready?.();
}

// HAPTIC
export function haptic(type = "light") {
  const h = tg()?.HapticFeedback;
  if (h?.impactOccurred) {
    // light | medium | heavy | rigid | soft
    h.impactOccurred(type);
    return;
  }
  // fallback (не всегда работает в iOS)
  if (navigator?.vibrate) navigator.vibrate(10);
}