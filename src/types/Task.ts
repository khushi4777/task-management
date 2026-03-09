export type TaskStatus = "todo" | "inprogress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: number;
}
