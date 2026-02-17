---
marp: true
theme: default
paginate: true
lang: de
---

# Mobile To-Do App  
Alabbas Dabbagh  
Mobile Software Engineering  

GitHub Repository:  
https://github.com/Alabbas-Dabbagh/todo-app

---

# Agenda (V-Modell Struktur)

1. Problem & Ziel  
2. Software Requirements  
3. Architektur  
4. Implementierung  
5. Systemtests  
6. Projektmanagement  
7. AI-Nutzung  
8. Fazit  

---

# 1. Problem & Ziel

- Viele kleine Aufgaben im Studium
- Keine lokale, einfache Übersicht
- Ziel:
  - Mobile To-Do App
  - Mehrere Listen
  - Statistik & Verlauf
  - Lokale Speicherung

---

# 2. Software Requirements (SRS)

Funktional:
- R1: Aufgabe erstellen
- R2: Aufgabe als erledigt markieren
- R3: Aufgabe löschen
- R4: Persistente Speicherung
- R6: Statistik & Verlauf
- R7: Mehrere Listen

Nicht-funktional:
- R5: Usability

Dokumentiert in `/docs/requirements.md`

---

# 3. Architektur

Komponenten:

- UI Layer (Tabs, Liste, Statistik)
- State Management (`tasks[]`)
- Persistenz (AsyncStorage)
- Routing (Expo Router)

Datenfluss:

User Action → State Update → AsyncStorage → Re-Render

---

# 4. Implementierung

Technologien:

- React Native + Expo Router
- TypeScript
- AsyncStorage
- Git & GitHub

Features:

- Mehrere Listen
- Statistik Dashboard
- Verlauf nur erledigter Aufgaben
- Dark Theme inkl. Navigation-Bar

---

# 5. Systemtests & Traceability

Mapping:

- R1 → T1 (Task Creation)
- R2 → T2 (Completion)
- R3 → T3 (Deletion)
- R4 → T4 (Persistence)
- R5 → T5 (Usability)
- R6 → T6 (Statistics)
- R7 → T7 (Multiple Lists)

Alle Tests: PASS  
Dokumentiert in `/docs/system-tests.md`

---

# 6. Projektmanagement

V-Modell Phasen:

1. Requirements
2. Architektur
3. Implementierung
4. Systemtests

Sprints:

- Sprint 1: Basis-App
- Sprint 2: Persistenz
- Sprint 3: Erweiterungen

---

# 7. AI-Nutzung & Code Review

Eingesetzt:

- Cursor AI

AI-Unterstützt:

- UI Styling
- Refactoring
- Statistik-Logik
- Dokumentation

Wichtig:
- Kein ungeprüfter Code
- Manuelles Review
- Git-Historie dokumentiert Änderungen

---

# 8. Fazit

Ergebnis:

- Vollständige To-Do App
- Mehrere Listen & Statistik
- Persistente Speicherung
- Vollständige V-Modell Dokumentation
- Systemtests vorhanden

Kernbotschaft:
Sauberer Engineering-Prozess ist wichtiger als Komplexität.
