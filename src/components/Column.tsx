import type { Task, TaskStatus } from "../types/Task";
import { TaskCard } from "./TaskCard";
import "./Column.css";

interface ColumnProps {
  title: string;
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export function Column({ title, tasks, onStatusChange, onDelete }: ColumnProps) {
  return (
    <div className="column">
      <h3 className="column-title">{title}</h3>
      <div className="column-cards">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
