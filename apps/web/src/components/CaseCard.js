export function CaseCard(c) {
  const dots = Array.from({ length: Math.min(6, Math.max(3, (c.rarity_dots || 4))) });
  return `
  <div class="card case fade-in">
    <div class="case-img">
      <img src="${c.image_url || "/assets/cases/placeholder.png"}" alt="" />
      ${c.is_daily ? `<div class="badge">Ежедневный</div>` : ""}
    </div>
    <div class="case-name">${c.name}</div>
    <div class="row" style="justify-content:center; gap:6px; margin:6px 0 10px;">
      <span class="pill">
        <img src="/assets/icons/ton.svg" width="18" height="18" alt="TON" />
        <b>${Number(c.price_ton).toFixed(2)}</b>
      </span>
    </div>
    <div class="dots">
      ${dots.map(() => `<span class="dot"></span>`).join("")}
    </div>
    <button class="btn primary" data-open="${c.id}">Открыть</button>
  </div>`;
}