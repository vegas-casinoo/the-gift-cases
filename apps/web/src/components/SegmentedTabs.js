export function SegmentedTabs({ tabs, active }) {
  return `
  <div class="seg">
    ${tabs.map(t => `
      <button class="seg-btn ${t.id===active ? "active":""}" data-tab="${t.id}">${t.label}</button>
    `).join("")}
  </div>`;
}