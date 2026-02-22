import { routes } from "./routes.js";

export function initRouter() {
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}

function renderRoute() {
  const path = location.hash.replace("#", "") || "/home";
  const screen = routes[path];
  const app = document.getElementById("content");

  if (screen) {
    app.innerHTML = "";
    screen();
  }
}