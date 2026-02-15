import { api } from "../lib/api.js";

export async function renderCases(root, opts = {}) {
  const { history } = await api("/history");
  root.innerHTML = `
    <h1>История</h1>
    <div style="height:10px"></div>
    ${history.map(h => `
      <div class="card" style="padding:14px; margin-bottom:10px;">
        <div style="font-weight:800">${h.cases?.name || "Case"}</div>
        <div class="small">Выпало: ${h.case_items?.title || "—"} (${h.case_items?.rarity || ""})</div>
        <div class="small">Потрачено: ${Number(h.spent_ton).toFixed(2)} TON</div>
      </div>
    `).join("") || `<div class="small">Пока пусто</div>`}
  `;
}