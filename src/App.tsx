import { useState, useMemo } from "react";
import type { Task, TaskStatus } from "./types/Task";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Column } from "./components/Column";
import "./App.css";

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: input.trim(),
      status: "todo",
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
    setInput("");
  };

  const changeStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") addTask();
  };

  const columns = useMemo(
    () => ({
      todo: tasks.filter((t) => t.status === "todo"),
      inprogress: tasks.filter((t) => t.status === "inprogress"),
      done: tasks.filter((t) => t.status === "done"),
    }),
    [tasks]
  );

  return (
    <div className="app">
      <h1 className="app-title">
        <span className="app-icon">☐</span> To-Do List
      </h1>

      <div className="add-bar">
        <input
          className="add-input"
          type="text"
          placeholder="Add your task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-btn" onClick={addTask}>
          ADD +
        </button>
      </div>

      <div className="board">
        <Column title="To Do" tasks={columns.todo} onStatusChange={changeStatus} onDelete={deleteTask} />
        <Column title="In Progress" tasks={columns.inprogress} onStatusChange={changeStatus} onDelete={deleteTask} />
        <Column title="Done" tasks={columns.done} onStatusChange={changeStatus} onDelete={deleteTask} />
      </div>
    </div>
  );
}

export default App;
