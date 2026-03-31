import { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as api from "../api/taskflow";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [t, p, s] = await Promise.all([api.getTasks(), api.getProjects(), api.getStats()]);
      setTasks(t);
      setProjects(p);
      setStats(s);
    } catch (e) {
      setError("Failed to connect to backend. Make sure FastAPI is running on port 8000.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const addTask = async (data) => {
    const task = await api.createTask(data);
    setTasks((prev) => [task, ...prev]);
    const s = await api.getStats();
    setStats(s);
    return task;
  };

  const editTask = async (id, data) => {
    const updated = await api.updateTask(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    const s = await api.getStats();
    setStats(s);
    return updated;
  };

  const removeTask = async (id) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    const s = await api.getStats();
    setStats(s);
  };

  const addProject = async (data) => {
    const project = await api.createProject(data);
    setProjects((prev) => [project, ...prev]);
    const s = await api.getStats();
    setStats(s);
    return project;
  };

  const editProject = async (id, data) => {
    const updated = await api.updateProject(id, data);
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  };

  const removeProject = async (id) => {
    await api.deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setTasks((prev) => prev.filter((t) => t.project_id !== id));
    const s = await api.getStats();
    setStats(s);
  };

  return (
    <AppContext.Provider value={{
      tasks, projects, stats, loading, error,
      addTask, editTask, removeTask,
      addProject, editProject, removeProject,
      refresh: fetchAll,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
