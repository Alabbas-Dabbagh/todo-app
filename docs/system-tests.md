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

---

## T6 – Test Statistics and History (R6)

Requirement: R6 – Statistics and History

Test Steps:
1. Ensure there are at least four tasks across all lists:  
   - Two completed tasks  
   - Two open tasks  
2. Open the `Übersicht` tab.  
3. Check the overall statistics section.  
4. Check the history list.

Expected Result:
- The total number of tasks in the statistics matches the number of created tasks.
- The counts for open and completed tasks match the current global state.
- The completion rate is calculated correctly (completed / total in percent).
- The history shows only the completed tasks, sorted with the newest task at the top.
- Each history entry shows the title and a readable creation time.

Result:
PASS

---

## T7 – Test Multiple Lists (R7)

Requirement: R7 – Multiple Lists

Test Steps:
1. On the main screen, select the list “Allgemein”.  
2. Create two tasks and complete one of them.  
3. Switch to the list “Arbeit” and create one open task.  
4. Observe the statistics row for each list.

Expected Result:
- In “Allgemein”, the list shows only the two created tasks; the statistics row reflects 2 total / 1 open / 1 completed.
- In “Arbeit”, the list shows only the one created task; the statistics row reflects 1 total / 1 open / 0 completed.
- Switching lists does not lose any tasks; switching back to a list restores its previous state.

Result:
PASS
