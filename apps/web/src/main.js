import { ready } from "./lib/telegram.js";
import { addRoute, render } from "./lib/router.js";
import { BottomNav, bindBottomNav } from "./components/BottomNav.js";

import { renderCases } from "./pages/cases.js";
import { renderProfile } from "./pages/profile.js";
import { renderHistory } from "./pages/history.js";
import { renderPromo } from "./pages/promo.js";
import { renderSupport } from "./pages/support.js";

ready();

const app = document.getElementById("app");

function shell(contentHtml) {
  app.innerHTML = `
    <div id="page">${contentHtml}</div>
    ${BottomNav()}
  `;
  bindBottomNav(document.body);
}

addRoute("cases", async () => {
  shell(`<div id="root"></div>`);
  await renderCases(document.querySelector("#root"));
});
addRoute("profile", async () => {
  shell(`<div id="root"></div>`);
  await renderProfile(document.querySelector("#root"));
});
addRoute("history", async () => {
  shell(`<div id="root"></div>`);
  await renderHistory(document.querySelector("#root"));
});
addRoute("promo", async () => {
  shell(`<div id="root"></div>`);
  await renderPromo(document.querySelector("#root"));
});
addRoute("support", async () => {
  shell(`<div id="root"></div>`);
  renderSupport(document.querySelector("#root"));
});

window.addEventListener("hashchange", render);
render();