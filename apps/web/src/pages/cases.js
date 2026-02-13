import { api } from "../lib/api.js";
import { SegmentedTabs } from "../components/SegmentedTabs.js";
import { CaseCard } from "../components/CaseCard.js";
import { ModalSheet, bindSheet } from "../components/ModalSheet.js";

let tab = "all";
let sheetEl = null;

export async function renderCases(root) {
  root.innerHTML = `
    <h1>Кейсы</h1>
    ${SegmentedTabs({ active: tab, tabs: [
      { id:"all", label:"Все" },
      { id:"popular", label:"Популярные" },
      { id:"new", label:"Новые" }
    ]})}
    <div style="height:12px"></div>
    <div id="casesGrid" class="grid"></div>
  `;

  root.querySelectorAll("[data-tab]").forEach(b => {
    b.addEventListener("click", async () => {
      tab = b.dataset.tab;
      await renderCases(root);
    });
  });

  const { cases } = await api(`/cases?tab=${encodeURIComponent(tab)}`);
  const grid = root.querySelector("#casesGrid");
  grid.innerHTML = cases.map(CaseCard).join("");

  grid.querySelectorAll("[data-open]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const caseId = btn.dataset.open;
      try {
        const data = await api(`/cases/${caseId}/open`, { method: "POST" });
        alert(`Выпало: ${data.reward.title} (${data.reward.rarity})`);
      } catch (e) {
        alert(e.message);
      }
    });
  });
}

// UI депозит (пока без реальных оплат — подключим следом)
export function openDeposit(root) {
  const body = `
    <div class="small">Выберите способ пополнения</div>
    <div style="height:10px"></div>
    <select class="select" id="depMethod">
      <option value="ton">TON Wallet</option>
      <option value="cryptobot">CryptoBot</option>
      <option value="stars">Telegram Stars</option>
    </select>
    <div style="height:12px"></div>

    <div class="small">Промокод</div>
    <div style="height:8px"></div>
    <input class="input" id="depPromo" placeholder="PROMOCODE" />

    <div style="height:12px"></div>
    <div class="small">Сумма пополнения</div>
    <div style="height:8px"></div>
    <div class="pill"><img src="/assets/icons/ton.svg" width="18" height="18" /> <b id="depAmountLabel">0.25</b></div>

    <div class="chips" id="depChips">
      ${["0.05","0.25","0.50","1","1.5","2","2.5","5"].map(v => `
        <button class="chip" data-amt="${v}">${v}</button>
      `).join("")}
    </div>
  `;

  const footer = `<button class="btn primary" id="depGo" style="width:100%">Пополнить</button>`;

  sheetEl = document.createElement("div");
  sheetEl.innerHTML = ModalSheet({ title: "Депозит", bodyHtml: body, footerHtml: footer });
  document.body.appendChild(sheetEl);

  const amountLabel = sheetEl.querySelector("#depAmountLabel");
  let amt = "0.25";
  amountLabel.textContent = amt;

  sheetEl.querySelectorAll("[data-amt]").forEach(ch => {
    ch.addEventListener("click", () => {
      sheetEl.querySelectorAll(".chip").forEach(x => x.classList.remove("active"));
      ch.classList.add("active");
      amt = ch.dataset.amt;
      amountLabel.textContent = amt;
    });
  });

  sheetEl.querySelector("#depGo").addEventListener("click", () => {
    // Следующий шаг: реальная интеграция (TON Connect / CryptoBot invoice / Stars)
    alert("MVP: экран готов. Дальше подключим оплату выбранным методом.");
  });

  bindSheet(sheetEl, closeDeposit);
}

export function closeDeposit() {
  if (sheetEl) {
    sheetEl.remove();
    sheetEl = null;
  }
}