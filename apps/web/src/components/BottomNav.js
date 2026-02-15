import { go, getRoute } from "../lib/router.js";

const items = [
  { id:"profile", label:"Профиль", icon:"profile.svg" },
  { id:"history", label:"История", icon:"history.svg" },
  { id:"cases", label:"Играть", icon:"play.svg", main:true },
  { id:"promo", label:"Промо", icon:"gift.svg" },
  { id:"support", label:"Поддержка", icon:"support.svg" },
];

export function BottomNav() {
  const active = getRoute();
  return `
  <nav class="bottom-nav">
    ${items.map(it => `
      <button class="bn-item ${it.main ? "main" : ""} ${active===it.id ? "active":""}" data-go="${it.id}">
<div class="bn-ic">
  <img src="/assets/icons/${it.icon}" width="20" height="20" />
</div>
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