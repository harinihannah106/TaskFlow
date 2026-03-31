import { useState } from "react";
import { useApp } from "../context/AppContext";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

export default function Dashboard() {
  const { tasks, stats, projects, loading, error } = useApp();
  const [showModal, setShowModal] = useState(false);

  const recent = tasks.slice(0, 6);
  const highPriority = tasks.filter((t) => t.priority === "high" && t.status !== "done").slice(0, 4);

  if (error) return (
    <div className="page-error">
      <div className="error-card">
        <h2>⚠ Backend Offline</h2>
        <p>{error}</p>
        <code>cd backend && uvicorn main:app --reload</code>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">Here's your productivity overview</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ New Task</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-total">
          <span className="stat-num">{stats.total_tasks ?? 0}</span>
          <span className="stat-lbl">Total Tasks</span>
        </div>
        <div className="stat-card stat-todo">
          <span className="stat-num">{stats.todo ?? 0}</span>
          <span className="stat-lbl">To Do</span>
        </div>
        <div className="stat-card stat-progress">
          <span className="stat-num">{stats.in_progress ?? 0}</span>
          <span className="stat-lbl">In Progress</span>
        </div>
        <div className="stat-card stat-done">
          <span className="stat-num">{stats.completed ?? 0}</span>
          <span className="stat-lbl">Completed</span>
        </div>
        <div className="stat-card stat-projects">
          <span className="stat-num">{stats.total_projects ?? 0}</span>
          <span className="stat-lbl">Projects</span>
        </div>
      </div>

      {stats.total_tasks > 0 && (
        <div className="progress-section">
          <div className="progress-label">
            <span>Overall Progress</span>
            <span>{stats.total_tasks ? Math.round((stats.completed / stats.total_tasks) * 100) : 0}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${stats.total_tasks ? (stats.completed / stats.total_tasks) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {highPriority.length > 0 && (
        <section className="dash-section">
          <h2 className="section-title">🔥 High Priority</h2>
          <div className="task-grid">
            {highPriority.map((t) => <TaskCard key={t.id} task={t} />)}
          </div>
        </section>
      )}

      <section className="dash-section">
        <h2 className="section-title">Recent Tasks</h2>
        {loading ? (
          <div className="loading-state">Loading tasks...</div>
        ) : recent.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet.</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>Create your first task</button>
          </div>
        ) : (
          <div className="task-grid">
            {recent.map((t) => <TaskCard key={t.id} task={t} />)}
          </div>
        )}
      </section>

      {showModal && <TaskModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
