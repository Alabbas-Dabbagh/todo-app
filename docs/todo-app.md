## Todo-App

Diese Todo-App ist eine kleine, lokale Aufgabenverwaltung auf Basis von **React Native**.  
Alle Einträge werden dauerhaft auf dem Gerät gespeichert und bleiben auch nach einem Neustart der App erhalten.

### Funktionen

- **Aufgaben anlegen**  
  - Eingabe im Textfeld „Neue Aufgabe hinzufügen…“  
  - Bestätigen über den Button **„Hinzufügen“** oder die Enter/Done-Taste der Tastatur  
  - Leere Eingaben werden per Hinweisdialog verhindert

- **Aufgaben abhaken**  
  - Tippen auf eine Aufgabe toggelt ihren Status
  - Der Status wird über einen farbigen Kreis links und durchgestrichenen Text visualisiert

- **Aufgaben löschen**  
  - Über den **„Löschen“**-Button am rechten Rand einer Aufgabe

- **Persistente Speicherung**  
  - Technisch umgesetzt über `AsyncStorage` mit dem Key `todo_tasks_v1`
  - Beim Start der App werden vorhandene Einträge geladen
  - Jede Änderung an der Liste wird automatisch gespeichert

### UI- und Designkonzept

- **Layout**
  - Dunkles, ruhiges Hintergrund-Theme (`styles.container`)
  - Oben ein Header mit Titel **„Meine Aufgaben“** und Unterzeile mit Status
  - Darunter eine „Karte“ (`styles.card`), die Eingabebereich und Liste bündelt

- **Statusanzeige**
  - Im Header wird angezeigt, wie viele offene Aufgaben es gibt  
    - 0 offene Aufgaben: Text „Du bist aktuell auf dem Laufenden.“  
    - >0 offene Aufgaben: z. B. „3 offene Aufgaben“

- **Eingabezeile**
  - Abgerundetes Eingabefeld (Pill-Form) mit dezenter Umrandung
  - Platzhaltertext in gedämpfter Farbe (`placeholderTextColor`)
  - Grüner, ebenfalls abgerundeter Primärbutton **„Hinzufügen“**

- **Aufgabenliste**
  - Jede Aufgabe liegt in einer abgerundeten Karte mit feiner Umrandung
  - Links ein Statusindikator:
    - Umrandeter Kreis für offene Aufgaben
    - Ausgefüllter grüner Kreis für erledigte Aufgaben
  - Text von erledigten Aufgaben ist leicht ausgegraut und durchgestrichen

- **Leerer Zustand**
  - Wenn noch keine Aufgaben vorhanden sind, wird der Inhalt der Liste zentriert dargestellt
  - Ergänzend zeigt der Header den Hinweis, dass alle Aufgaben erledigt sind

### Technische Details

- **Datei**: `app/(tabs)/index.tsx`
- **Typdefinition**
  - `Task` enthält `id: string`, `title: string`, `completed: boolean`
- **State**
  - `title`: aktueller Eingabetext
  - `tasks`: aktuelle Liste aller Aufgaben
  - `isLoaded`: Flag, ob der erste Ladevorgang aus dem Speicher abgeschlossen ist

Die Struktur ist bewusst kompakt gehalten, damit die App leicht erweitert werden kann, z. B. um Filter (nur offene/erledigte Aufgaben), Kategorien oder Fälligkeitsdaten.

