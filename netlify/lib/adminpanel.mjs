// ⚙️ Admin-Panel (nur Turnierleitung): alle wichtigen Werkzeuge als Buttons
import { COLOR } from "./data.mjs";
const b = (label, id, emoji, style = 2, disabled = false) => ({ type: 2, style, label, custom_id: id, emoji: { name: emoji }, disabled });
const row = (...c) => ({ type: 1, components: c });

export function adminPanel(t) {
  const st = t?.status;
  const statusLine = !t ? "💤 **Kein Cup aktiv** – mit *Neuer Cup* starten"
    : st === "anmeldung" ? `📝 **${t.name}** · Anmeldung offen · ${t.reg.length} Teams angemeldet`
    : st === "checkin" ? `🕗 **${t.name}** · Check-in läuft · ${t.checked.length}/${t.reg.length} eingecheckt`
    : st === "gruppen" ? `⚽ **${t.name}** · Gruppenphase · Spieltag ${t.round}`
    : st === "ko" ? `⚔️ **${t.name}** · K.-o.-Phase`
    : `🏁 **${t.name}** · beendet`;
  return {
    embeds: [{
      color: COLOR,
      title: "⚙️ ADMIN-PANEL · APEX ARENA",
      description: [
        statusLine,
        "",
        "**🏆 Cup** – Neuer Cup · Anmeldeschluss · Check-in beenden · Abbrechen",
        "**👥 Teams** – Team hinzufügen · abmelden · Freilos + / −",
        "**⚽ Spiele** – offene Spiele · Ergebnis festlegen · EA verknüpfen · TOTT posten",
        "**🚫 Sperren** – sperren · Sperre aufheben",
        "**🧪 Test & Pflege** – Test-Cup · Test-Spiele ausspielen · Panels · Rechte · Status",
      ].join("\n"),
      footer: { text: "Nur Turnierleitung · Antworten siehst nur du" },
    }],
    components: [
      row(b("Neuer Cup", "adm:new", "🆕", 3, !!t && ["anmeldung", "checkin", "gruppen", "ko"].includes(st)), b("Anmeldeschluss", "adm:close", "⏩", 1, st !== "anmeldung"), b("Check-in beenden", "adm:ciend", "✅", 1, st !== "checkin"), b("Cup abbrechen", "adm:cancel", "🛑", 4, !t || st === "fertig")),
      row(b("Team hinzufügen", "adm:add", "➕", 2), b("Team abmelden", "adm:rem", "➖", 2), b("Freilos +", "adm:fl+", "🎟️", 2), b("Freilos −", "adm:fl-", "🎟️", 2)),
      row(b("Offene Spiele", "adm:games", "📋", 2), b("Ergebnis festlegen", "adm:result", "✏️", 1), b("EA verknüpfen", "adm:ea", "🔗", 2), b("TOTT posten", "adm:tott", "⭐", 2)),
      row(b("Sperren", "ban_start", "🚫", 4), b("Sperre aufheben", "ban_lift", "🔓", 2), b("Test-Cup", "adm:test", "🧪", 2), b("Test-Spiele ausspielen", "adm:testgo", "▶️", 2)),
      row(b("Panels aktualisieren", "adm:panels", "🔄", 2), b("Rechte setzen", "adm:perms", "🔐", 2), b("Status", "adm:status", "📊", 2), b("Panel neu laden", "adm:refresh", "♻️", 2)),
    ],
  };
}

const modal = (id, title, fields) => ({ type: 9, data: { custom_id: id, title, components: fields.map((f) => row({ type: 4, style: f.long ? 2 : 1, required: f.req !== false, ...f, long: undefined, req: undefined })) } });
export const newCupModal = () => modal("admm:new", "Neuer Cup", [
  { custom_id: "name", label: "Name des Cups", min_length: 3, max_length: 60, placeholder: "z. B. Apex Arena #1" },
  { custom_id: "anpfiff", label: "Anpfiff (TT.MM.JJJJ HH:MM)", min_length: 10, max_length: 16, placeholder: "28.11.2026 20:00" },
]);
export const resultModal = () => modal("admm:result", "Ergebnis festlegen", [
  { custom_id: "spiel", label: "Spiel-Nr. (siehe Offene Spiele)", max_length: 4, placeholder: "z. B. 7" },
  { custom_id: "heim", label: "Tore Heim", max_length: 2, placeholder: "2" },
  { custom_id: "gast", label: "Tore Gast", max_length: 2, placeholder: "1" },
  { custom_id: "elfmeter", label: "Elfmeter (nur K.-o. bei Unentschieden)", max_length: 5, placeholder: "4:3", req: false },
]);
export const eaModal = () => modal("admm:ea", "EA-Club verknüpfen", [
  { custom_id: "team", label: "Teamname (genau wie in der Übersicht)", max_length: 30 },
  { custom_id: "ea_id", label: "EA-Club-ID (leer = per Name suchen)", max_length: 12, req: false },
]);
/** Auswahl eines Teams (für hinzufügen/abmelden) */
export function teamPick(id, names, placeholder) {
  if (!names.length) return { content: "Keine passenden Teams.", components: [] };
  return { content: placeholder, components: [row({ type: 3, custom_id: id, placeholder: "Team wählen…", options: names.slice(0, 25).map((n) => ({ label: n.slice(0, 100), value: n.slice(0, 100) })) })] };
}
