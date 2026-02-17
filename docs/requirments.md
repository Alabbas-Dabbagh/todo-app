# Software Requirements Specification (SRS)

## Project Title
Mobile Aufgabenverwaltung (To-Do App)

## Author
Alabbas Dabbagh

## Platform
Android (React Native with Expo)

---

# Functional Requirements

## R1 – Task Creation
When the user enters text into the input field and presses the "Add" button,
the system shall create a new task and display it in the task list.

Acceptance Criteria:
- The task appears immediately after pressing "Add".
- Empty input is not allowed.
- The input field is cleared after successful creation.

---

## R2 – Task Completion
When the user taps on an existing task,
the system shall mark the task as completed and visually distinguish it.

Acceptance Criteria:
- Completed tasks appear visually different (e.g., strikethrough or color change).
- The status remains until changed again.

---

## R3 – Task Deletion
When the user presses the delete button next to a task,
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

# Non-Functional Requirement

## R5 – Usability
The application shall provide a simple and intuitive user interface optimized for smartphone usage.

Acceptance Criteria:
- Buttons are touch-friendly.
- Text is readable.
- Layout adapts to screen size.
