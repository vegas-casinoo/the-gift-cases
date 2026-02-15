export async function renderSupport(root, opts = {}) {
  root.innerHTML = `
    <h1>Поддержка</h1>
    <div class="card" style="padding:14px;">
      <div style="font-weight:800">FAQ</div>
      <div class="small" style="margin-top:8px;">— Как пополнить? (скоро)</div>
      <div class="small">— Как вывести? (скоро)</div>
      <div style="height:12px"></div>
      <button class="btn primary" style="width:100%" onclick="window.open('https://t.me/your_support','_blank')">Написать</button>
    </div>
  `;
}