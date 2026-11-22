# ⚡ Apex Bot – Apex Arena (Netlify)

Discord-Turnierbot für **Pro Clubs**: eigene Teams mit Namen, Logo & EA-Club-ID, Cups erstellst du selbst,
Ergebnisse & Statistiken **direkt von EA**, Live-Spielplan & Turnierbaum als Bild, TOTT (3-4-1-2), Hall of Fame,
Team-Statistiken, Sperren, Support-Tickets, Staff-Bewerbungen. Läuft komplett auf **Netlify**.

---

## 1. Discord-Bot anlegen
1. https://discord.com/developers/applications → **New Application** → „Apex Bot“. App Icon: `public/logo.jpg`.
2. **General Information:** *Application ID* und *Public Key* kopieren.
3. **Bot:** *Reset Token* → Token kopieren (geheim!). **Server Members Intent** einschalten.
4. **OAuth2 → URL Generator:** `bot` + `applications.commands`, Recht **Administrator** → Bot einladen.
5. Server-ID kopieren (Entwicklermodus → Rechtsklick auf den Server → *Server-ID kopieren*).

## 2. GitHub
Neues **privates** Repo (z. B. `Apex-Bot`) → **Add file → Upload files** → den *Inhalt* dieser ZIP hineinziehen → Commit.

## 3. Netlify
1. **Add new site → Import an existing project → GitHub** → Repo wählen → Deploy.
2. **Site configuration → Environment variables:**

| Variable | Inhalt |
|---|---|
| `DISCORD_TOKEN` | Bot-Token |
| `DISCORD_PUBLIC_KEY` | Public Key |
| `DISCORD_APP_ID` | Application ID |
| `DISCORD_GUILD_ID` | Server-ID |
| `SETUP_KEY` | frei gewähltes Passwort, z. B. `apex-setup-123` |

Optional: `EA_RESULTS=0` (EA-Ergebnisse aus), `EA_MIN_MINUTES=80` (Mindest-Spielzeit), `EA_AUTO=0` (EA komplett aus).
Netlify Blobs (Speicher) funktioniert automatisch – kein Token nötig.

3. **Deploys → Trigger deploy → Deploy site** → danach **veröffentlichen** (Published).

## 4. Discord verbinden
1. Developer Portal → **General Information → Interactions Endpoint URL:**
   `https://DEINE-SEITE.netlify.app/api/interactions` → Speichern.
2. Befehle registrieren (einmal im Browser öffnen):
   `https://DEINE-SEITE.netlify.app/api/setup?key=DEIN_SETUP_KEY`

## 5. In Discord einrichten
- Bot-Rolle in der Rollenliste **ganz nach oben** ziehen.
- `/cup-einrichten alles` → legt **alle Kategorien, Kanäle und Rollen** an, setzt Rechte, postet Panels
  (inkl. Staff-Kanäle **📡 EA-Status** und **⚠️ EA-Abbrüche**, öffentlich **📊 Team-Statistiken**).
- Cup erstellen: `/cup-turnier name: Apex Arena #1 anpfiff: 28.11.2026 20:00` → Liste kommt in **📝 Anmeldung**.
- Teams: Kanal **Registrieren** → *Mannschaft registrieren* (Teamname + **EA-Club-ID**), Logo mit `/cup-logo bild:`.

## Befehle
| Befehl | Wofür |
|---|---|
| `/cup-einrichten` | Einrichtung (alles, rechte, panels, status …) |
| `/cup-turnier` | neuen Cup erstellen |
| `/cup-ergebnis` | Ergebnis melden (falls EA nicht liefert) |
| `/cup-logo` | Team-Logo hochladen |
| `/cup-admin` | Turnierleitung: Ergebnis festlegen, abmelden, Freilos, EA verknüpfen, TOTT, Test-Cup … |
| `/cup-bewerbung` | Staff-Bewerbungen öffnen/schließen |

## Updates
Neue Dateien ins GitHub-Repo hochladen → Netlify baut automatisch → **veröffentlichen**.
Nur bei neuen/geänderten Befehlen den Setup-Link nochmal öffnen.
