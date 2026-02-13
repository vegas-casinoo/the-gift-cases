import crypto from "crypto";

export function pickWeighted(items) {
  // items: [{id, weight}]
  const total = items.reduce((s, x) => s + Number(x.weight || 0), 0);
  if (total <= 0) throw new Error("No weights");
  const r = crypto.randomInt(1, total + 1);
  let acc = 0;
  for (const it of items) {
    acc += Number(it.weight || 0);
    if (r <= acc) return it;
  }
  return items[items.length - 1];
}