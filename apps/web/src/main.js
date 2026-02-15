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

app.innerHTML = `
  <div id="page">
    <div class="page">
      <div id="root"></div>
    </div>
  </div>
  ${BottomNav()}
`;

bindBottomNav(document.body);

addRoute("cases", renderCases);
addRoute("profile", renderProfile);
addRoute("history", renderHistory);
addRoute("promo", renderPromo);
addRoute("support", renderSupport);

window.addEventListener("hashchange", render);
render();