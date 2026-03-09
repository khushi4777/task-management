import type { Task, TaskStatus } from "../types/Task";
import "./TaskCard.css";

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const isDone = task.status === "done";

  const cycleStatus = () => {
    const next: Record<TaskStatus, TaskStatus> = {
      todo: "inprogress",
      inprogress: "done",
      done: "todo",
    };
    onStatusChange(task.id, next[task.status]);
  };

  return (
    <div className={`task-card ${isDone ? "task-done" : ""}`}>
      <button
        className={`status-circle ${task.status}`}
        onClick={cycleStatus}
        title="Change status"
        aria-label="Change status"
      >
        {isDone && <span className="check-icon">✓</span>}
      </button>
      <span className="task-card-title">{task.title}</span>
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        title="Delete task"
        aria-label="Delete task"
      >
        🗑
      </button>
    </div>
  );
}
