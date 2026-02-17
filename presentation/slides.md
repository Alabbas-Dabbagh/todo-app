---
marp: true
theme: default
paginate: true
lang: de
---

# Mobile Task Management App  
*(To-Do App)*

- **Kurs**: Mobile Software Engineering
- **Projekt**: Mobile Task Management App (To-Do App)
- **Autor**: Alabbas Dabbagh
- **Technologien**:
  - React Native (Expo Router, TypeScript)
  - AsyncStorage
  - Git & GitHub
  - Visual Studio Code
  - Cursor AI (AI-unterstützte Entwicklung)

---

## Agenda (Software V‑Modell)

- 1️⃣ Einführung & Problemstellung  
- 2️⃣ Software Requirements (SRS)  
- 3️⃣ Systemarchitektur  
- 4️⃣ Implementierung  
- 5️⃣ Systemtests  
- 6️⃣ Projektmanagement & Planung  
- 7️⃣ AI‑Nutzung & Code Review  
- 8️⃣ Fazit & Ausblick

<!--
Speaker notes:
- Kurz den Projektkontext erklären: Uni-Projekt im Kurs Mobile Software Engineering.
- Hinweis, dass der Vortrag strikt dem Software V‑Modell folgt.
- Zeitrahmen: ca. 15 Minuten, Fokus auf Engineering-Prozess und Qualität, nicht auf Feature-Masse.
-->

---

## 1. Einführung & Problemstellung

- **Alltagsproblem**:
  - Viele kleine Aufgaben im Studium & Alltag
  - Zettelwirtschaft, chaotische Notizen, vergessene Todos
- **Ziel**:
  - Simple, mobile To‑Do App
  - Lokale Speicherung, keine Cloud / kein Login
  - Fokus auf Übersichtlichkeit, Dark Theme & gute Bedienbarkeit
- **Rahmenbedingungen**:
  - React Native mit Expo
  - Maximaler Umfang für einen 15‑Minuten‑Vortrag

<!--
Speaker notes:
- Problem: Studierende haben viele parallele Aufgaben, verlieren aber schnell den Überblick.
- Motivation: Eine kleine, fokussierte Todo-App, die lokal funktioniert, reicht oft völlig aus.
- Kein komplexes Backend, bewusst keine User-Accounts, damit Fokus auf Mobile Engineering und Qualität.
-->

---

## 2. Software Requirements (SRS) – Überblick

- **Funktionale Anforderungen**:
  - R1: Aufgaben anlegen
  - R2: Aufgaben als erledigt markieren
  - R3: Aufgaben löschen
  - R4: Persistente Speicherung (AsyncStorage)
  - R6: Statistik & Verlauf
  - R7: Mehrere Listen (Allgemein, Arbeit, Einkauf, Ansicht „Alle“)
- **Nicht-funktionale Anforderung**:
  - R5: Usability (einfache, mobile UI, Dark Theme)
- **Dokumentation**:
  - Vollständiges SRS in `docs/requirments.md`

<!--
Speaker notes:
- Kurz alle Requirements nennen, im Detail dann auf die wichtigsten eingehen.
- Betonung: Anforderungen wurden vor der Implementierung definiert und später in Tests abgedeckt.
- R6/R7 sind Erweiterungen, aber vollständig dokumentiert.
-->

---

## 2. SRS – Zentrale Requirements im Detail

- **R1 – Task Creation**:
  - Text eingeben, Button „Hinzufügen“ → neue Aufgabe erscheint in Liste
  - Leere Eingaben werden verhindert
- **R2 – Task Completion**:
  - Tipp auf Aufgabe toggelt Status
  - Visuell: durchgestrichener Text, farbiger Indikator
- **R3 – Task Deletion**:
  - „Löschen“-Button pro Aufgabe
  - Nur ausgewählte Aufgabe verschwindet
- **R4 – Local Persistence (AsyncStorage)**:
  - Aufgaben bleiben nach App-Neustart erhalten
  - Erledigter Status wird mitgespeichert

<!--
Speaker notes:
- R1–R3 sind die klassischen Basisfunktionen einer To‑Do App.
- R4 ist kritisch für Mobile Use-Cases: App darf Daten nach Schließen nicht verlieren.
- AsyncStorage wird als einfache Schlüssel-Wert-Speicherlösung verwendet.
-->

---

## 2. SRS – Erweiterte Requirements

- **R5 – Usability**:
  - Touch-freundliche Buttons
  - Responsive Layout, gut lesbare Schrift
  - Dunkles Design (auch für Navigation-Bar unten)
- **R6 – Statistik & Verlauf**:
  - Übersichtstab zeigt:
    - Gesamtanzahl, offene & erledigte Aufgaben
    - Erledigungsquote in %
    - Verlauf aller erledigten Aufgaben (chronologisch)
  - Verlauf filterbar nach „Alle“ oder pro Liste
- **R7 – Multiple Lists**:
  - Listen: „Allgemein“, „Arbeit“, „Einkauf“ + Ansicht „Alle“
  - Aufgaben gehören genau **einer** Liste (`listId`)
  - Hauptseite zeigt pro Liste nur **offene** Aufgaben

<!--
Speaker notes:
- Hier betonen, dass der Fokus auf Übersicht und Nachvollziehbarkeit liegt (Statistik & Verlauf).
- Listenfunktion erlaubt saubere Trennung von Kontexten (privat, Arbeit, Einkauf).
- Usability umfasst auch visuelle Anpassungen, z.B. dunkle Navigationsleiste unten.
-->

---

## 3. Systemarchitektur – Übersicht

- **Architektur-Ansatz**:
  - Komponentenbasierte Architektur mit React Native
  - Orientierung am V‑Modell: klare Trennung von Phasen
- **Hauptkomponenten**:
  - UI‑Schicht
  - State Management
  - Persistenz (AsyncStorage)
  - Routing & Navigation (Expo Router, Tabs)
- **Wichtige Dateien**:
  - `app/(tabs)/index.tsx` – Hauptliste
  - `app/(tabs)/explore.tsx` – Übersicht & Verlauf
  - `constants/task-lists.ts` – Listen‑Konfiguration
  - `docs/*.md` – Dokumentation & Tests

<!--
Speaker notes:
- Auf die klare Schichtung eingehen: UI, Zustand, Speicherung.
- Expo Router ermöglicht Tab-Navigation (Aufgaben / Übersicht).
- Dokumentation ist als eigener Teil der Architektur zu verstehen.
-->

---

## 3. Systemarchitektur – Komponenten

- **UI Layer**:
  - Dark Theme, Kartenlayout, Statistikzeile
  - Tab „Aufgaben“ und Tab „Übersicht“
  - Listen-Umschalter mit Icons (Person, Aktenkoffer, Einkaufswagen)
- **State Management**:
  - `tasks[]` als React State
  - `currentListId` (inkl. virtuelle Ansicht „all“)
  - `createdAt` & `listId` je Aufgabe
- **Persistenzschicht**:
  - AsyncStorage mit Key `todo_tasks_v1`
  - Laden beim Start, Speichern nach jeder Änderung
  - Abwärtskompatibilität: ältere Aufgaben ohne `listId` → Default-Liste

<!--
Speaker notes:
- Betonung auf einfacher, aber klar strukturierter Architektur.
- Listenumschalter und Virtuelle „Alle“-Ansicht sind nur State-Filter, keine separaten Datenquellen.
- AsyncStorage wird für vollständige Aufgabenobjekte genutzt (inkl. Status und Liste).
-->

---

## 4. Implementierung – Technology Stack

- **Frontend / App**:
  - React Native + Expo Router
  - TypeScript für Typensicherheit
- **Persistenz**:
  - AsyncStorage als lokale Key-Value-Datenbank
- **Entwicklungswerkzeuge**:
  - Visual Studio Code + Cursor AI
  - Git & GitHub für Versionskontrolle
- **Styling**:
  - Manuelles Styling (StyleSheet)
  - Dark Theme für Inhalt und Navigationsbereiche

<!--
Speaker notes:
- Kurze Begründung für TypeScript: frühzeitige Fehlererkennung, klarere Modelle (Task, Listen).
- Expo Router vereinfacht Navigation und Tab-Struktur.
- Cursor AI wird gleich im AI-Teil detailliert beschrieben, hier nur erwähnen.
-->

---

## 4. Implementierung – Zentrale Features

- **Mehrere Listen**:
  - Konfiguration in `constants/task-lists.ts`
  - UI-Chips zum Umschalten inkl. Icons
  - Filter „Alle“ bündelt Aufgaben aus allen Listen
- **Statistik & Verlauf**:
  - Statistikzeile pro Liste / Filter
  - Tab „Übersicht“:
    - Globale Kennzahlen
    - Per-Liste-Zusammenfassung
    - Verlauf nur für erledigte Aufgaben
- **Dark Theme & Navigation-Bar**:
  - Hintergrund `#020617` für Inhalt
  - Android Navigation-Bar via `expo-navigation-bar` dunkel eingefärbt
  - Helle Buttons für gute Lesbarkeit

<!--
Speaker notes:
- Konkrete Stellen im Code erwähnen (ohne alles zu zeigen): Index-Tab, Explore-Tab, Task-Listen-Konstanten.
- Dark-Theme-Anpassung der unteren Systemleiste als Beispiel für Detail-Usability.
- Hinweis, dass erledigte Aufgaben nicht doppelt erscheinen, sondern nur im Verlauf.
-->

---

## 5. Systemtests & Traceability

- **Testdokumentation**:
  - `docs/system-tests.md`
  - Tests T1–T7
- **Mapping Requirements → Tests**:
  - R1: T1 (Task Creation)
  - R2: T2 (Task Completion)
  - R3: T3 (Task Deletion)
  - R4: T4 (Local Persistence)
  - R5: T5 (Usability)
  - R6: T6 (Statistics & History)
  - R7: T7 (Multiple Lists)
- **Ergebnisse**:
  - Alle definierten Tests: **PASS**
  - Dokumentierte Testschritte & erwartete Resultate

<!--
Speaker notes:
- Explizit betonen, dass für jedes Requirement ein Testfall existiert (Traceability).
- Beispiel: R4 ↔ T4 – App schließen/öffnen, Aufgaben bleiben erhalten.
- Erwähnen, dass die Tests manuell durchgeführt und mit PASS dokumentiert wurden.
-->

---

## 6. Projektmanagement & Planung (V‑Modell)

- **V‑Modell-Phasen**:
  - Requirements-Analyse (SRS)
  - Architekturdesign (UML, Architektur-Doku)
  - Implementierung (Index, Explore, Listen, Persistenz)
  - Systemtests (T1–T7)
- **Iterative Sprints**:
  - Sprint 1: Grundgerüst, Basis-UI
  - Sprint 2: Funktionen Add/Toggle/Delete, AsyncStorage
  - Sprint 3: Styling, Statistiken, Mehrlisten, Historie
- **Dokumentation**:
  - `docs/project-plan.md` mit Phasen & Sprints

<!--
Speaker notes:
- Zeigen, dass die Arbeit nicht ad-hoc war, sondern entlang des V‑Modells strukturiert.
- In jedem Sprint wurde ein konsistenter Feature-Umfang abgeschlossen.
- Doku und Code wurden parallel gepflegt (keine „Last-Minute“-Doku).
-->

---

## 7. AI-Nutzung & Code Review

- **Eingesetztes Tool**:
  - Cursor AI (basierend auf GPT‑Modell)
- **AI-unterstützte Bereiche**:
  - Vorschläge für UI-Styling (Dark Theme, Kartenlayout)
  - Refactorings (Aufteilung in Listen, Statistiklogik)
  - Generierung & Aktualisierung von Dokumentation (SRS, Tests, Architektur)
- **Wichtige Prinzipien**:
  - **Kein** ungeprüfter Code:  
    - Alle Vorschläge wurden gelesen, verstanden und manuell angepasst
  - Git-Historie als Nachvollziehbarkeit von Änderungen
  - Fokus auf Lesbarkeit und Wartbarkeit statt „Magie“

<!--
Speaker notes:
- Klarstellen, dass AI nicht die Verantwortung übernommen hat, sondern als Assistenz diente.
- Beispiele: Vorschlag für Statistiken, History-Filter, aber immer mit eigenem Verständnis integriert.
- Betonen, dass alle Änderungen durch Git dokumentiert sind.
-->

---

## 7. Git & GitHub – Versionskontrolle

- **Git-Strategie**:
  - Feature-basierte Commits (z.B. „add statistics dashboard“, „implement multiple lists“)
  - Trennung von Code-, Styling- und Doku-Commits, wo sinnvoll
- **GitHub-Nutzung**:
  - Zentrales Remote-Repository
  - Sicherung und Versionshistorie
- **Nutzen im Projekt**:
  - Rückverfolgung von Änderungen (besonders bei AI-Unterstützung wichtig)
  - Möglichkeit, ältere Stände wiederherzustellen

<!--
Speaker notes:
- Aufzeigen, dass Git systematisch verwendet wurde, nicht nur für „letzten Commit“.
- GitHub als zentrales Backup und als Nachweis für den Projektverlauf.
- Verbindung zum AI-Teil: Git erleichtert Kontrolle über AI-generierte Änderungen.
-->

---

## 8. Fazit & Ausblick

- **Erreichte Ziele**:
  - Vollständige To‑Do App mit:
    - Mehreren Listen & „Alle“-Ansicht
    - Persistenter Speicherung via AsyncStorage
    - Statistik & Verlauf nur für erledigte Aufgaben
    - Dark Theme inkl. angepasster Systemnavigation
  - Vollständige V‑Modell-Dokumentation & Tests
- **Lernpunkte**:
  - Wert von klaren Requirements & Traceability
  - AI als produktive Hilfe – aber nur mit Review
- **Mögliche Erweiterungen**:
  - Eigene Listen definieren
  - Erinnerungen / Notifications
  - Optionaler Cloud-Sync (nicht Teil dieses Projekts)

<!--
Speaker notes:
- Zusammenfassung der wichtigsten technischen und prozessualen Ergebnisse.
- Hervorheben, dass sogar Details wie Dark Theme Navigation gelöst wurden.
- Ausblick bewusst als „Future Work“, nicht als bereits implementierte Features.
-->

---

## Abschlussslide – Kurzfassung

- **Projekt**:
  - Mobile To‑Do App mit Mehrlisten, Statistik & Verlauf
- **Technik**:
  - React Native (Expo, TypeScript), AsyncStorage
- **Prozess**:
  - V‑Modell, SRS → Architektur → Implementierung → Tests
  - Vollständig dokumentiert in `/docs`
- **Qualität**:
  - Manuelle Systemtests (T1–T7, alle PASS)
  - AI-Unterstützung mit konsequentem Code-Review
- **Kernbotschaft**:
  - Auch kleine Apps profitieren stark von sauberem Engineering-Prozess

<!--
Speaker notes:
- Letzte Folie als „Takeaway“ nutzen.
- Drei Begriffe hervorheben: Struktur, Nachvollziehbarkeit, Qualität.
- Zum Schluss kurz auf die Live-Demo überleiten.
-->

