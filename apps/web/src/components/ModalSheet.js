export function ModalSheet({ title, bodyHtml, footerHtml = "" }) {
  return `
  <div class="sheet-backdrop" data-close="1">
    <div class="sheet card" role="dialog" aria-modal="true">
      <div class="sheet-head">
        <div class="sheet-title">${title}</div>
        <button class="sheet-x" data-close="1">✕</button>
      </div>
      <div class="sheet-body">${bodyHtml}</div>
      ${footerHtml ? `<div class="sheet-foot">${footerHtml}</div>` : ""}
    </div>
  </div>`;
}

export function bindSheet(root, onClose) {
  root.querySelectorAll("[data-close]").forEach(el => {
    el.addEventListener("click", (e) => {
      if (e.target === el || el.dataset.close) onClose?.();
    });
  });
}