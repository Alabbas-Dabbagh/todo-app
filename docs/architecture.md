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

---

## 2. Components

### UI layer
- `TextInput` to enter a task  
- **„Hinzufügen“** button to create a task  
- `FlatList` to display all tasks  
- Tap on a task to toggle its completed state  
- **„Löschen“** button to remove a task

### State management
- `tasks[]` stored in React state  
- Task structure:
  - `id: string`
  - `title: string`
  - `completed: boolean`

### Persistence layer
- `AsyncStorage` stores tasks locally  
- `loadTasks()` on app start  
- `saveTasks()` after each change

---

## 3. Data flow

User action (Add / Toggle / Delete) → update `tasks` state → save to AsyncStorage → UI re-renders.

---

## 4. Technology stack

- React Native  
- Expo  
- TypeScript  
- AsyncStorage  
- Git + GitHub

