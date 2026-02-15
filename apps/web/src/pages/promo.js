import { api } from "../lib/api.js";

export async function renderPromo(root, opts = {}) {
  root.innerHTML = `
    <h1>Промо</h1>
    <div class="card" style="padding:14px;">
      <div class="small">Введите промокод</div>
      <div style="height:8px"></div>
      <input class="input" id="code" placeholder="PROMOCODE" />
      <div style="height:10px"></div>
      <button class="btn primary" id="apply" style="width:100%">Ввести</button>
    </div>
  `;

  root.querySelector("#apply").addEventListener("click", async () => {
    const code = root.querySelector("#code").value.trim();
    try {
      const r = await api("/promo/apply", { method:"POST", body: JSON.stringify({ code }) });
      alert(`Успех! +${Number(r.reward_ton).toFixed(2)} TON`);
    } catch (e) {
      alert(e.message);
    }
  });
}