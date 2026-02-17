## To-Do App

This to-do app is a small, local task manager built with **React Native**.  
All entries are stored persistently on the device and remain available after restarting the app.

The **UI texts inside the app are in German** (for example: title `„Meine Aufgaben“`, button labels `„Hinzufügen“` and `„Löschen“`), while this documentation is written in English.

### Features

- **Multiple lists**  
  - Predefined lists: “Allgemein”, “Arbeit”, “Einkauf”  
  - A list selector with icons (person / briefcase / shopping cart) at the top of the main card lets the user switch between lists  
  - All operations (add / complete / delete) work per selected list

- **Create tasks**  
  - Enter text into the input field labeled “Neue Aufgabe hinzufügen…”  
  - Confirm via the **„Hinzufügen“** button or the enter/done key on the keyboard  
  - Empty input is prevented via a hint dialog

- **Complete tasks**  
  - Tap on a task to toggle its completion state  
  - Status is visualised by a coloured circle on the left and strikethrough text

- **Delete tasks**  
  - Use the **„Löschen“** button on the right side of a task

- **Persistent storage**  
  - Implemented with `AsyncStorage` using the key `todo_tasks_v1`  
  - On app start, existing tasks are loaded and enriched with list information if missing  
  - Every change to the list is saved automatically

- **Statistics and history (Explore tab)**  
  - The second tab (`Übersicht`) shows an overview dashboard  
  - Key figures: total tasks, open tasks, completed tasks and completion rate (in %)  
  - A per-list summary shows counts and completion rate for each list  
  - A history list shows all **completed** tasks in reverse chronological order  
  - The history can be filtered by “Alle” or by a specific list

### UI and design concept

- **Layout**
  - Dark, calm background theme (`styles.container`)  
  - Header at the top with the title **„Meine Aufgaben“** and a subtitle indicating the current status  
  - Below, a “card” (`styles.card`) that groups the input area and the list
  - On Android devices, the system navigation bar at the bottom is tinted to match the dark app background so that the back / home buttons remain clearly visible

- **Status display**
  - The header shows how many open tasks exist  
    - 0 open tasks: text “Du bist aktuell auf dem Laufenden.”  
    - >0 open tasks: e.g. “3 offene Aufgaben”

- **Input row**
  - Rounded, pill-shaped input field with subtle border  
  - Placeholder text with muted colour (`placeholderTextColor`)  
  - Green, rounded primary button **„Hinzufügen“**

- **Task list**
  - Each **open** task is displayed inside a rounded card with a subtle border  
  - Status indicator on the left:
    - Outlined circle for open tasks  
    - Filled green circle for completed tasks  
  - Completed task text is slightly greyed out and shown with strikethrough

- **Empty state**
  - When there are no tasks yet, the list content is vertically centered  
  - The header additionally indicates that all tasks are done

- **Statistics row on the main screen**
  - When there are tasks, a compact statistics row appears above the list  
  - It shows: total number of tasks, number of open tasks, number of completed tasks and the completion rate

### Technical details

- **Files**:  
  - Main list: `app/(tabs)/index.tsx`  
  - Overview & statistics: `app/(tabs)/explore.tsx`  
  - Shared list definitions: `constants/task-lists.ts`
- **Type definition**
  - `Task` contains `id: string`, `title: string`, `completed: boolean`, `createdAt?: number`, `listId: string`
- **State**
  - `title`: current input text  
  - `tasks`: current list of all tasks across lists  
  - `currentListId`: currently selected list on the main screen  
  - `isLoaded`: flag indicating whether the initial load from storage has completed

The structure is intentionally compact so that the app can easily be extended in the future—for example with custom lists, filters, categories or due dates.


