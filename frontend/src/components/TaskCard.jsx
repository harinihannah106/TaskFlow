import { useState } from "react";
import { useApp } from "../context/AppContext";
import TaskModal from "./TaskModal";

const priorityColor = { low: "var(--accent-green)", medium: "var(--accent-amber)", high: "var(--accent-red)" };
const statusLabel = { todo: "To Do", in_progress: "In Progress", done: "Done" };

export default function TaskCard({ task }) {
  const { projects, editTask, removeTask } = useApp();
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const project = projects.find((p) => p.id === task.project_id);

  const toggleDone = () => editTask(task.id, { status: task.status === "done" ? "todo" : "done" });
  const handleDelete = async () => {
    if (!confirming) return setConfirming(true);
    await removeTask(task.id);
  };

  const isOverdue = task.due_date && task.status !== "done" && new Date(task.due_date) < new Date();

  return (
    <>
      <div className={`task-card ${task.status === "done" ? "task-done" : ""}`}>
        <div className="task-card-top">
          <button className={`task-check ${task.status === "done" ? "checked" : ""}`} onClick={toggleDone}>
            {task.status === "done" ? "✓" : ""}
          </button>
          <div className="task-meta">
            {project && (
              <span className="task-project-badge" style={{ background: project.color + "22", color: project.color }}>
                {project.name}
              </span>
            )}
            <span className="priority-dot" style={{ background: priorityColor[task.priority] }} title={task.priority + " priority"} />
          </div>
        </div>

        <p className={`task-title ${task.status === "done" ? "strikethrough" : ""}`}>{task.title}</p>
        {task.description && <p className="task-desc">{task.description}</p>}

        <div className="task-card-footer">
          <span className={`task-status-badge status-${task.status}`}>{statusLabel[task.status]}</span>
          {task.due_date && (
            <span className={`task-due ${isOverdue ? "overdue" : ""}`}>
              {isOverdue ? "⚠ " : "📅 "}{task.due_date}
            </span>
          )}
          <div className="task-actions">
            <button className="task-action-btn" onClick={() => setEditing(true)} title="Edit">✎</button>
            <button
              className={`task-action-btn delete-btn ${confirming ? "confirming" : ""}`}
              onClick={handleDelete}
              onBlur={() => setConfirming(false)}
              title={confirming ? "Click again to confirm" : "Delete"}
            >
              {confirming ? "!" : "✕"}
            </button>
          </div>
        </div>
      </div>

      {editing && <TaskModal task={task} onClose={() => setEditing(false)} />}
    </>
  );
}
