// Team-Logos (hochgeladen mit /cup-logo) als Bild für Canvas-Grafiken
import { loadImage } from "@napi-rs/canvas";
import { get } from "./store.mjs";
const cache = new Map();
export async function teamLogo(name) {
  if (cache.has(name)) return cache.get(name);
  const l = await get(`logo:${name}`).catch(() => null);
  const img = l?.b64 ? await loadImage(Buffer.from(l.b64, "base64")).catch(() => null) : null;
  cache.set(name, img);
  return img;
}
