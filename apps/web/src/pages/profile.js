import { api } from "../lib/api.js";
import { openDeposit } from "./cases.js";

export async function renderProfile(root) {
  const me = await api("/me");
  const bal = await api("/wallet/balance");

  root.innerHTML = `
    <div class="row" style="justify-content:center; margin-top: 8px;">
      <div style="text-align:center">
        <div class="small">Ваш баланс</div>
        <div style="font-size:44px; font-weight:900; letter-spacing:.5px; display:flex; align-items:center; justify-content:center; gap:10px;">
          <span>${Number(bal.wallet.balance_ton).toFixed(2)}</span>
          <img src="/assets/icons/ton.svg" width="34" height="34" alt="TON"/>
        </div>

        <div class="row" style="justify-content:center; gap:22px; margin: 10px 0 16px;">
          <button class="btn" id="btnDep">➕ Пополнить</button>
          <button class="btn" id="btnW">⬆️ Вывести</button>
        </div>

        <div class="seg">
          <button class="seg-btn active">Пополнения</button>
          <button class="seg-btn">Выводы</button>
          <button class="seg-btn">Игры</button>
        </div>

        <div style="height:14px"></div>

        <div class="card" style="padding:14px; text-align:left;">
          <div style="font-weight:800; font-size:18px;">${me.user.username || me.user.first_name || "Профиль"}</div>
          <div class="small">telegram_id: ${me.user.telegram_id}</div>
        </div>
      </div>
    </div>
  `;

  root.querySelector("#btnDep").addEventListener("click", () => openDeposit(root));
  root.querySelector("#btnW").addEventListener("click", () => alert("MVP: позже добавим вывод (gift/stars/ton)."));
}