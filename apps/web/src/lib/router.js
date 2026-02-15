const routes = new Map();
let current = "";

export function addRoute(name, renderFn) {
  routes.set(name, renderFn);
}

export function getRoute() {
  return current || (window.location.hash || "#cases").slice(1);
}

function getDir(from, to) {
  const order = ["profile", "history", "cases", "promo", "support"];
  const a = order.indexOf(from);
  const b = order.indexOf(to);
  if (a === -1 || b === -1) return 1;
  return b >= a ? 1 : -1;
}

async function animateSwap(container, dir, nextHtml) {
  const old = container.querySelector(".page");
  const next = document.createElement("div");
  next.className = "page";
  next.innerHTML = nextHtml;

  // старт позиции новой страницы
  next.style.transform = `translateX(${dir * 18}px)`;
  next.style.opacity = "0";

  container.appendChild(next);

  // анимация (WAAPI)
  const a1 = old?.animate?.(
    [
      { transform: "translateX(0px)", opacity: 1 },
      { transform: `translateX(${-dir * 18}px)`, opacity: 0 }
    ],
    { duration: 220, easing: "cubic-bezier(.2,.9,.2,1)", fill: "forwards" }
  );

  const a2 = next.animate(
    [
      { transform: `translateX(${dir * 18}px)`, opacity: 0 },
      { transform: "translateX(0px)", opacity: 1 }
    ],
    { duration: 240, easing: "cubic-bezier(.2,.9,.2,1)", fill: "forwards" }
  );

  await Promise.allSettled([a1?.finished, a2.finished]);

  if (old) old.remove();
  next.style.transform = "";
  next.style.opacity = "";
}

export async function go(name) {
  const from = getRoute();
  current = name;
  window.location.hash = name;

  const fn = routes.get(name) || routes.get("cases");
  const container = document.querySelector("#page");
  const dir = getDir(from, name);

  // Рендерим в строку (через временный div)
  const tmp = document.createElement("div");
  tmp.innerHTML = `<div id="root"></div>`;
  await fn(tmp.querySelector("#root"), { silent: true }); // render without shell
  const nextHtml = tmp.innerHTML;

  await animateSwap(container, dir, nextHtml);
}

export async function render() {
  const name = (window.location.hash || "#cases").slice(1);
  current = name;
  const fn = routes.get(name) || routes.get("cases");
  await fn(document.querySelector("#root"));
}