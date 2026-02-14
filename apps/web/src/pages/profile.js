import { api } from "../lib/api.js";
import { getInitData, tg } from "../lib/telegram.js";
import { openDeposit } from "./cases.js";

function esc(s) {
  return String(s || "").replace(/[<>&"]/g, (c) => ({ "<":"&lt;", ">":"&gt;", "&":"&amp;", '"':"&quot;" }[c]));
}

export async function renderProfile(root) {
  root.innerHTML = `
    <h1>Профиль</h1>
    <div class="card" style="padding:14px;">
      <div style="font-weight:800">Debug</div>
      <div class="small">VITE_API_BASE: ${esc(import.meta.env.VITE_API_BASE || "(empty)")}</div>
      <div class="small">tg exists: ${Boolean(tg())}</div>
      <div class="small">initData length: ${getInitData().length}</div>
      <div class="small" id="dbg">Запросы...</div>
    </div>

    <div style="height:12px"></div>
    <div id="content"></div>
  `;

  const dbg = root.querySelector("#dbg");
  const content = root.querySelector("#content");

  try {
    const me = await api("/me");
    dbg.textContent = "me ok";

    const bal = await api("/wallet/balance");
    dbg.textContent = "me ok, balance ok";

    content.innerHTML = `
      <div class="row" style="justify-content:center; margin-top: 8px;">
        <div style="text-align:center">
          <div class="small">Ваш баланс</div>
          <div style="font-size:44px; font-weight:900; display:flex; align-items:center; justify-content:center; gap:10px;">
            <span>${Number(bal.wallet.balance_ton).toFixed(2)}</span>
            <img src="/assets/icons/ton.PNG" width="34" height="34" alt="TON"/>
          </div>

          <div class="row" style="justify-content:center; gap:22px; margin: 10px 0 16px;">
            <button class="btn" id="btnDep">➕ Пополнить</button>
            <button class="btn" id="btnW">⬆️ Вывести</button>
          </div>

          <div class="card" style="padding:14px; text-align:left;">
            <div style="font-weight:800; font-size:18px;">${me.user.username || me.user.first_name || "Профиль"}</div>
            <div class="small">telegram_id: ${me.user.telegram_id}</div>
          </div>
        </div>
      </div>
    `;

    root.querySelector("#btnDep").addEventListener("click", () => openDeposit(root));
    root.querySelector("#btnW").addEventListener("click", () => alert("MVP: позже добавим вывод."));
  } catch (e) {
    dbg.textContent = "ERROR: " + (e?.message || String(e));
    content.innerHTML = `<div class="small">Профиль не загрузился.</div>`;
  }
}