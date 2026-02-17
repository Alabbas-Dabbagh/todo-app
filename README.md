# Mobile Task Management App (To‑Do App)

Author: **Alabbas Dabbagh**  
Course: *Mobile Software Engineering*

This project is a small but complete mobile task management app (To‑Do App) built with **React Native** and **Expo**.  
The focus is on a clear engineering process (Software V‑Model), good documentation, and a clean, dark-themed UI.

---

## Features

- **Task management**
  - Create tasks via input field and “Hinzufügen” button
  - Toggle tasks as completed by tapping on them
  - Delete tasks via “Löschen” button
- **Multiple lists**
  - Predefined lists: *Allgemein*, *Arbeit*, *Einkauf*
  - Virtual view **Alle** that aggregates all lists
  - Each task belongs to exactly one list (`listId`)
- **Statistics & history**
  - Per‑list statistics on the main screen (total / open / completed / completion rate)
  - Separate “Übersicht” tab:
    - Global statistics across all lists
    - Per‑list summary
    - History of **completed** tasks only, newest first
    - History filterable by “Alle” or per list
- **Persistence**
  - Local storage via **AsyncStorage** (`todo_tasks_v1`)
  - Tasks (including completion state and list) survive app restarts
- **UI / UX**
  - Dark theme with card‑based layout
  - Android navigation bar tinted to match the app background
  - Icon‑based list selector (person / briefcase / shopping cart)

---

## Technology Stack

- **Core**
  - React Native (with Expo)
  - Expo Router (tab‑based navigation)
  - TypeScript
- **Persistence**
  - `@react-native-async-storage/async-storage`
- **Tooling**
  - Visual Studio Code
  - Cursor AI (AI‑assisted development)
  - Git & GitHub for version control

---

## Project Structure (Overview)

- `app/_layout.tsx` – Root layout, theme & system UI (StatusBar & Android NavigationBar)
- `app/(tabs)/index.tsx` – Main “Aufgaben” tab (lists, stats, open tasks)
- `app/(tabs)/explore.tsx` – “Übersicht” tab (global stats, per‑list stats, history)
- `app/(tabs)/_layout.tsx` – Tab navigator configuration
- `constants/task-lists.ts` – Definition of the predefined lists & icons
- `docs/` – Documentation (SRS, architecture, tests, project plan, app description)
- `presentation/` – Marp slides and demo script for the university presentation

---

## Running the App

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npx expo start
   ```

3. **Open the app**

   From the Expo CLI, you can choose:

   - Android emulator  
   - iOS simulator  
   - Physical device via Expo Go (QR code)

> Note: The app is primarily designed and tested for a dark theme on Android, but also runs on other platforms supported by Expo.

---

## Requirements & Testing

The project follows the **Software V‑Model** and defines requirements in `docs/requirments.md`:

- R1–R4: Core features (create, complete, delete, persist tasks)
- R5: Usability
- R6: Statistics & history
- R7: Multiple lists

System tests are documented in `docs/system-tests.md`:

- Tests T1–T7 map directly to the requirements (traceability)
- Each test contains:
  - Test steps
  - Expected result
  - Final result (PASS)

There are currently no automated tests; all tests were **manually executed** and documented.

---

## Documentation & Presentation

- `docs/todo-app.md` – High‑level app description (features, UI design, technical details)
- `docs/architecture.md` – Architecture description and data flow
- `docs/requirments.md` – Software Requirements Specification (SRS)
- `docs/system-tests.md` – System test documentation and results
- `docs/project-plan.md` – Project plan & development phases
- `docs/architecture.puml` – UML diagram (PlantUML)
- `presentation/slides.md` – Marp slides for a 15‑minute university presentation
- `presentation/demo-script.md` – 2‑minute live demo guide

---

## AI Usage (Cursor AI)

This project used **Cursor AI** as an assistant for:

- UI styling suggestions (dark theme, layouts, icons)
- Refactorings (statistics, list handling, history filtering)
- Generating and updating documentation (SRS, architecture, tests, presentation slides)

**Important**:

- All AI‑generated or suggested code was **manually reviewed, understood, and adapted** before integration.
- Git history documents when and how code and docs evolved, providing full transparency.

---

## License

This project is intended as a **university course project**.  
If you want to reuse parts of the code or documentation, please reference the author and the course context.

