import { useApp } from "../context/AppContext";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "tasks", label: "Task Board", icon: "◈" },
  { id: "projects", label: "Projects", icon: "◉" },
];

export default function Sidebar({ activePage, setActivePage }) {
  const { stats } = useApp();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-mark">TF</span>
        <span className="logo-text">TaskFlow</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-stats">
        <div className="mini-stat">
          <span className="mini-stat-val">{stats.total_tasks ?? 0}</span>
          <span className="mini-stat-label">Total Tasks</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-val" style={{ color: "var(--accent-green)" }}>{stats.completed ?? 0}</span>
          <span className="mini-stat-label">Done</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-val" style={{ color: "var(--accent-amber)" }}>{stats.in_progress ?? 0}</span>
          <span className="mini-stat-label">In Progress</span>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="user-avatar">U</div>
          <span>User</span>
        </div>
      </div>
    </aside>
  );
}
