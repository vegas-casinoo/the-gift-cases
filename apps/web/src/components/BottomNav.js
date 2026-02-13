import { go, getRoute } from "../lib/router.js";

const items = [
  { id: "profile", label: "Профиль", icon: "👤" },
  { id: "history", label: "История", icon: "🕒" },
  { id: "cases", label: "Играть", icon: "▶️", main: true },
  { id: "promo", label: "Промо", icon: "🎁" },
  { id: "support", label: "Поддержка", icon: "🎧" }
];

export function BottomNav() {
  const active = getRoute();
  return `
  <nav class="bottom-nav">
    ${items.map(it => `
      <button class="bn-item ${it.main ? "main" : ""} ${active===it.id ? "active":""}" data-go="${it.id}">
        <div class="bn-ic ${it.main ? "glow" : ""}">${it.icon}</div>
        <div class="bn-t">${it.label}</div>
      </button>
    `).join("")}
  </nav>`;
}

export function bindBottomNav(root) {
  root.querySelectorAll("[data-go]").forEach(btn => {
    btn.addEventListener("click", () => go(btn.dataset.go));
  });
}