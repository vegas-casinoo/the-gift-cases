const routes = new Map();
let current = "";

export function addRoute(name, renderFn) {
  routes.set(name, renderFn);
}

export function go(name) {
  current = name;
  window.location.hash = name;
  render();
}

export function render() {
  const name = (window.location.hash || "#cases").slice(1);
  current = name;
  const fn = routes.get(name) || routes.get("cases");
  fn?.();
}

export function getRoute() {
  return current || (window.location.hash || "#cases").slice(1);
}