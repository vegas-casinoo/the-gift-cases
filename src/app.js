import { initRouter } from "./router/router.js";
import { renderLayout } from "./ui/layout.js";

const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
}

// Тест что JS реально запустился
document.getElementById("app").innerHTML =
  "<div style='padding:16px;color:#fff'>JS LOADED ✅</div>";

renderLayout();
initRouter();