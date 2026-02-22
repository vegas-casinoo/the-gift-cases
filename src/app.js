import { initRouter } from "./router/router.js";
import { renderLayout } from "./ui/layout.js";

const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

renderLayout();
initRouter();