export type TaskList = {
  id: string;
  title: string;
};

export const TASK_LISTS: TaskList[] = [
  { id: "personal", title: "Allgemein" },
  { id: "work", title: "Arbeit" },
  { id: "shopping", title: "Einkauf" },
];

export const DEFAULT_LIST_ID = TASK_LISTS[0].id;

