# Software Architecture Documentation

## Project
Mobile Aufgabenverwaltung (To-Do App)

## Author
Alabbas Dabbagh

---

## 1. Overview
The application uses a simple component-based architecture with React Native.

Main parts:
1) UI Layer
2) State Management
3) Persistence (AsyncStorage)

---

## 2. Components

### UI Layer
- TextInput to enter a task
- Add button to create a task
- FlatList to display all tasks
- Tap on task to toggle completed
- Delete button to remove a task

### State Management
- tasks[] stored in React state
- Task structure:
  - id: string
  - title: string
  - completed: boolean

### Persistence Layer
- AsyncStorage stores tasks locally
- loadTasks() on app start
- saveTasks() after each change

---

## 3. Data Flow
User action (Add/Toggle/Delete) -> update tasks state -> save to AsyncStorage -> UI re-renders

---

## 4. Technology Stack
- React Native
- Expo
- JavaScript
- AsyncStorage
- Git + GitHub
