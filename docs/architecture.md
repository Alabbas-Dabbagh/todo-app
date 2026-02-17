# Software Architecture Documentation

## Project
Mobile task manager (To-Do App)

## Author
Alabbas Dabbagh

---

## 1. Overview

The application uses a simple component-based architecture with React Native and TypeScript.

Main parts:
1) UI layer  
2) State management  
3) Persistence layer (AsyncStorage)  
4) Derived statistics and history view (Explore tab)

---

## 2. Components

### UI layer
- `TextInput` to enter a task (main tab `index.tsx`)  
- **„Hinzufügen“** button to create a task  
- `FlatList` to display all tasks  
- Tap on a task to toggle its completed state  
- **„Löschen“** button to remove a task  
- Statistics & history screen in the `Explore` tab (`explore.tsx`) which visualises totals, open/completed counts, completion rate and a chronological history of tasks

### State management
- `tasks[]` stored in React state on the main screen and re-used (read-only) in the Explore tab  
- Task structure:
  - `id: string`
  - `title: string`
  - `completed: boolean`
  - `createdAt?: number` (Unix timestamp in milliseconds to support history and sorting)

### Persistence layer
- `AsyncStorage` stores tasks locally under the key `todo_tasks_v1`  
- `loadTasks()` on app start reads persisted tasks  
- `saveTasks()` after each change keeps storage in sync with the in-memory state  
- The Explore tab reads the same stored data and computes statistics on the fly

---

## 3. Data flow

- Main tab:  
  User action (Add / Toggle / Delete) → update `tasks` state → save to AsyncStorage → UI re-renders.

- Explore tab:  
  On tab load → read tasks from AsyncStorage → derive totals, completion rate and sorted history → render read-only statistics.

---

## 4. Technology stack

- React Native  
- Expo  
- TypeScript  
- AsyncStorage  
- Git + GitHub

