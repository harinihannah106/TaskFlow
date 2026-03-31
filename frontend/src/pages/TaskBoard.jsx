import { useState } from "react";
import { useApp } from "../context/AppContext";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

const COLUMNS = [
  { id: "todo", label: "To Do", color: "var(--col-todo)" },
  { id: "in_progress", label: "In Progress", color: "var(--col-progress)" },
  { id: "done", label: "Done", color: "var(--col-done)" },
];

export default function TaskBoard() {
  const { tasks, loading } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({ priority: "", project_id: "" });
  const { projects } = useApp();

  const filtered = tasks.filter((t) => {
    if (filter.priority && t.priority !== filter.priority) return false;
    if (filter.project_id && String(t.project_id) !== filter.project_id) return false;
    return true;
  });

  const byStatus = (status) => filtered.filter((t) => t.status === status);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Task Board</h1>
          <p className="page-sub">Kanban-style task management</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ New Task</button>
      </div>

      <div className="filter-bar">
        <select className="filter-select" value={filter.priority} onChange={(e) => setFilter((f) => ({ ...f, priority: e.target.value }))}>
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select className="filter-select" value={filter.project_id} onChange={(e) => setFilter((f) => ({ ...f, project_id: e.target.value }))}>
          <option value="">All Projects</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        {(filter.priority || filter.project_id) && (
          <button className="btn btn-ghost btn-sm" onClick={() => setFilter({ priority: "", project_id: "" })}>Clear</button>
        )}
      </div>

      {loading ? (
        <div className="loading-state">Loading board...</div>
      ) : (
        <div className="kanban-board">
          {COLUMNS.map((col) => {
            const colTasks = byStatus(col.id);
            return (
              <div key={col.id} className="kanban-col">
                <div className="kanban-col-header" style={{ borderTop: `3px solid ${col.color}` }}>
                  <span className="kanban-col-title">{col.label}</span>
                  <span className="kanban-count">{colTasks.length}</span>
                </div>
                <div className="kanban-cards">
                  {colTasks.length === 0 ? (
                    <div className="kanban-empty">No tasks</div>
                  ) : (
                    colTasks.map((t) => <TaskCard key={t.id} task={t} />)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && <TaskModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
