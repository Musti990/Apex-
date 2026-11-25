// Umzug: alle Daten von der alten Netlify-Seite auf diesen Server holen.
// Aufruf: docker compose run --rm apex node import-netlify.mjs https://DEINE-SEITE.netlify.app DEIN_SETUP_KEY
import { set } from "./netlify/lib/store.mjs";

const [base, key] = process.argv.slice(2);
if (!base || !key) { console.log("Aufruf: node import-netlify.mjs https://DEINE-SEITE.netlify.app SETUP_KEY"); process.exit(1); }
const api = (q) => fetch(`${base.replace(/\/$/, "")}/api/export?key=${encodeURIComponent(key)}${q}`).then(async (r) => { if (!r.ok) throw new Error(`${r.status} ${await r.text()}`); return r.json(); });
const { keys } = await api("");
console.log(`📦 ${keys.length} Einträge gefunden – übertrage …`);
let n = 0;
for (const k of keys) {
  const { v } = await api(`&k=${encodeURIComponent(k)}`);
  if (v !== null && v !== undefined) { await set(k, v); n++; }
  if (n % 20 === 0) process.stdout.write(`  ${n}/${keys.length}\r`);
}
console.log(`✅ Fertig: ${n} Einträge übernommen (Teams, Logos, Cups, Statistik, Einstellungen, Kanal-Verknüpfungen).`);
