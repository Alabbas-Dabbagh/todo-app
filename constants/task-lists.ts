export type TaskList = {
  id: string;
  title: string;
  iconName: "person.fill" | "briefcase.fill" | "cart.fill";
};

export const TASK_LISTS: TaskList[] = [
  { id: "personal", title: "Allgemein", iconName: "person.fill" },
  { id: "work", title: "Arbeit", iconName: "briefcase.fill" },
  { id: "shopping", title: "Einkauf", iconName: "cart.fill" },
];

export const DEFAULT_LIST_ID = TASK_LISTS[0].id;

