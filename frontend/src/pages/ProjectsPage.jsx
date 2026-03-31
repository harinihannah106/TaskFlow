import { useState } from "react";
import { useApp } from "../context/AppContext";

const COLORS = ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ef4444", "#14b8a6"];

function ProjectModal({ project, onClose }) {
  const { addProject, editProject } = useApp();
  const isEdit = !!project;
  const [form, setForm] = useState({ name: project?.name || "", description: project?.description || "", color: project?.color || "#6366f1" });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (isEdit) await editProject(project.id, form);
      else await addProject(form);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>{isEdit ? "Edit Project" : "New Project"}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input className="form-input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Project name" autoFocus />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-input form-textarea" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="What is this project about?" rows={2} />
          </div>
          <div className="form-group">
            <label>Color</label>
            <div className="color-picker">
              {COLORS.map((c) => (
                <button key={c} type="button" className={`color-swatch ${form.color === c ? "selected" : ""}`} style={{ background: c }} onClick={() => setForm((f) => ({ ...f, color: c }))} />
              ))}
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : isEdit ? "Update" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const { projects, tasks, removeProject } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const taskCount = (pid) => tasks.filter((t) => t.project_id === pid).length;
  const doneCount = (pid) => tasks.filter((t) => t.project_id === pid && t.status === "done").length;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="page-sub">Organize tasks into projects</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditTarget(null); setShowModal(true); }}>+ New Project</button>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <p>No projects yet. Create one to organize your tasks!</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>Create Project</button>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((p) => {
            const total = taskCount(p.id);
            const done = doneCount(p.id);
            const pct = total ? Math.round((done / total) * 100) : 0;
            return (
              <div key={p.id} className="project-card" style={{ borderLeft: `4px solid ${p.color}` }}>
                <div className="project-card-top">
                  <div className="project-color-dot" style={{ background: p.color }} />
                  <h3 className="project-name">{p.name}</h3>
                  <div className="project-actions">
                    <button className="task-action-btn" onClick={() => { setEditTarget(p); setShowModal(true); }}>✎</button>
                    <button className="task-action-btn delete-btn" onClick={() => removeProject(p.id)}>✕</button>
                  </div>
                </div>
                {p.description && <p className="project-desc">{p.description}</p>}
                <div className="project-stats">
                  <span>{total} tasks</span>
                  <span>{done} done</span>
                  <span>{pct}%</span>
                </div>
                <div className="progress-bar sm">
                  <div className="progress-fill" style={{ width: `${pct}%`, background: p.color }} />
                </div>
                <p className="project-date">Created {new Date(p.created_at).toLocaleDateString()}</p>
              </div>
            );
          })}
        </div>
      )}

      {showModal && <ProjectModal project={editTarget} onClose={() => { setShowModal(false); setEditTarget(null); }} />}
    </div>
  );
}
