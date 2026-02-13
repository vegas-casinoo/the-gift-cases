import { getInitData } from "./telegram.js";

export const API_BASE = import.meta.env.VITE_API_BASE || ""; // если web и api на одном домене — оставь пустым

export async function api(path, options = {}) {
  const res = await fetch(API_BASE + "/api" + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `tma ${getInitData()}`,
      ...(options.headers || {})
    }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || "Request error");
  return data;
}