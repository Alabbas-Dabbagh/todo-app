# Handout – Mobile To-Do App  
Alabbas Dabbagh  
Matrikelnummer: 102205994  
Kurs: Mobile Software Engineering  

GitHub Repository:  
https://github.com/Alabbas-Dabbagh/todo-app  

---

## Projektziel

Entwicklung einer mobilen To-Do App mit mehreren Aufgabenlisten, Statistikfunktion und persistenter Speicherung unter Anwendung des Software-V-Modells.

---

## Software Requirements (Auszug)

R1 – Aufgabe erstellen  
R2 – Aufgabe als erledigt markieren  
R3 – Aufgabe löschen  
R4 – Persistente Speicherung (AsyncStorage)  
R5 – Usability  
R6 – Statistik & Verlauf  
R7 – Mehrere Listen  

Alle Requirements sind dokumentiert und testbar.

---

## Architektur

- UI Layer (React Native, Expo Router)
- State Management (`tasks[]`)
- Persistenz über AsyncStorage
- Routing über Tabs

Datenfluss:  
User Action → State Update → Speicherung → UI Re-Render

---

## Implementierung

Technologien:
- React Native (Expo Router, TypeScript)
- AsyncStorage
- Git & GitHub
- Cursor AI (assistiv)

Besonderheiten:
- Mehrere Aufgabenlisten
- Statistik & Verlauf erledigter Aufgaben
- Dark Theme inkl. Navigation-Bar Anpassung

---

## Systemtests

Für jedes Requirement existiert ein Testfall (T1–T7).  
Alle Tests wurden manuell durchgeführt und dokumentiert (PASS).

Beispiel:  
R4 → T4: App schließen & neu öffnen → Daten bleiben erhalten.

---

## Fazit

Das Projekt zeigt, dass auch eine kompakte mobile Anwendung durch klar definierte Anforderungen, dokumentierte Architektur, systematische Tests und Versionierung professionell umgesetzt werden kann.
