# System Test Documentation

## Project
Mobile task manager (To-Do App)

## Author
Alabbas Dabbagh

---

# Test Overview

The following tests validate the functional and non-functional requirements defined in the SRS document.

---

## T1 – Test Task Creation (R1)

Requirement: R1 – Task Creation

Test Steps:
1. Start the application.
2. Enter a task title in the input field.
3. Press the **„Hinzufügen“** button.

Expected Result:
- The new task appears in the list.
- The input field is cleared.

Result:
PASS

---

## T2 – Test Task Completion (R2)

Requirement: R2 – Task Completion

Test Steps:
1. Add a new task.
2. Tap on the task in the list.

Expected Result:
- The task is visually marked as completed (strikethrough).
- Tapping again toggles the state.

Result:
PASS

---

## T3 – Test Task Deletion (R3)

Requirement: R3 – Task Deletion

Test Steps:
1. Add a task.
2. Press the **„Löschen“** button next to the task.

Expected Result:
- The task is removed from the list.
- Other tasks remain unchanged.

Result:
PASS

---

## T4 – Test Local Persistence (R4)

Requirement: R4 – Local Persistence

Test Steps:
1. Add one or more tasks.
2. Close the application completely.
3. Reopen the application.

Expected Result:
- Previously created tasks are restored.
- Completion status remains unchanged.

Result:
PASS

---

## T5 – Test Usability (R5)

Requirement: R5 – Usability

Test Steps:
1. Interact with all buttons and input fields.
2. Check readability of text.

Expected Result:
- Buttons are easily clickable.
- Text is readable.
- Layout adapts properly.

Result:
PASS
