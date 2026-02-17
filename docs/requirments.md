# Software Requirements Specification (SRS)

## Project Title
Mobile task manager (To-Do App)

## Author
Alabbas Dabbagh

## Platform
Android (React Native with Expo)

---

# Functional Requirements

## R1 – Task Creation
When the user enters text into the input field and presses the **„Hinzufügen“** button,  
the system shall create a new task and display it in the task list.

Acceptance Criteria:
- The task appears immediately after pressing **„Hinzufügen“**.
- Empty input is not allowed.
- The input field is cleared after successful creation.

---

## R2 – Task Completion
When the user taps on an existing task,  
the system shall mark the task as completed and visually distinguish it.

Acceptance Criteria:
- Completed tasks appear visually different (e.g., strikethrough or colour change).
- The status remains until changed again.

---

## R3 – Task Deletion
When the user presses the delete button (**„Löschen“**) next to a task,  
the system shall remove the selected task from the list.

Acceptance Criteria:
- The task disappears immediately.
- No other tasks are affected.

---

## R4 – Local Persistence
When the user closes and reopens the application,  
the system shall restore previously created tasks.

Acceptance Criteria:
- Tasks remain stored after app restart.
- Completed state is preserved.

---

# Additional Functional Requirements

## R6 – Statistics and History
When the user opens the `Explore` tab,  
the system shall display an overview of the task list including statistics and a chronological history.

Acceptance Criteria:
- The overview shows: total number of tasks, number of open tasks, number of completed tasks and completion rate in percent.
- A history list shows tasks in reverse chronological order (newest first).
- Each history entry shows at least the task title, its current status (open / completed) and the creation time.

---

## R7 – Multiple Lists
When the user switches between predefined lists,  
the system shall filter tasks and statistics to the currently selected list on the main screen.

Acceptance Criteria:
- The app provides at least the lists “Allgemein”, “Arbeit” and “Einkauf”.
- New tasks are always created in the currently selected list.
- The list selector visibly highlights the active list and shows an icon for each list.
- The statistics row above the task list reflects only the tasks of the active list.

---

# Non-Functional Requirement

## R5 – Usability
The application shall provide a simple and intuitive user interface optimised for smartphone usage.

Acceptance Criteria:
- Buttons are touch-friendly.
- Text is readable.
- Layout adapts to screen size.
