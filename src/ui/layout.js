import { renderBottomNav } from "./bottomNav.js";

export function renderLayout() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="header">FREE STARS VEGAS</div>
    <div id="content" style="padding:16px;"></div>
    <div id="bottomNav"></div>
  `;

  renderBottomNav();
}