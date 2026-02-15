import { go, getRoute } from "../lib/router.js";
import { haptic } from "../lib/telegram.js";

const items = [
  { id: "profile", label: "Профиль", icon: "profile.svg" },
  { id: "history", label: "История", icon: "history.svg" },
  { id: "cases", label: "Играть", icon: "play.svg" },
  { id: "promo", label: "Промо", icon: "gift.svg" },
  { id: "support", label: "Поддержка", icon: "support.svg" }
];

export function BottomNav() {
  const active = getRoute();
  return `
    <nav class="bottom-nav">
      ${items
        .map(
          (it) => `
            <button class="bn-item ${active === it.id ? "active" : ""}" data-go="${it.id}">
              <div class="bn-ic">
                <img src="/assets/icons/${it.icon}" width="20" height="20" alt="${it.label}" />
              </div>
              <div class="bn-t">${it.label}</div>
            </button>
          `
        )
        .join("")}
    </nav>
  `;
}

export function bindBottomNav(root) {
  root.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => {
      haptic("light");
      btn.classList.add("tap");
      setTimeout(() => btn.classList.remove("tap"), 170);
      go(btn.dataset.go);
    });
  });
}